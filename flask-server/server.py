from flask import Flask
from flask import request
import json
from annoy import AnnoyIndex
from scipy import spatial
import numpy as np
import pandas as pd
import sys
import pickle

app = Flask(__name__)

# Read Dataframe and confusion matrix developed from python notebook


# sys.path.append('../Steam-game-recommendation-system')

dataset = pickle.load(open('./../Dataset/meta_games_dict.pkl','rb'))
ml = pickle.load(open('./../Dataset/confusion_matrix_con.pkl','rb'))


#Using ANNOY library, finding recommendation for user selection
def test_annoy_knn(index, Ntrees, Nsamples, method = "euclidean"):
    
    vector_length = 1459
    t = AnnoyIndex(vector_length, metric = method)

    for i,v in zip(range(Nsamples), ml[:Nsamples]):
        t.add_item(i, v)

    t.build(Ntrees)

    return t.get_nns_by_item(index, 15)[1:]

# Dictionary where each key represents app id of each game in dataframe and value represents the index positions in it 
indexTable = {v: k for k, v in dataset['appid'].items()}

# Cosine Similarity function to determine difference as an equivalent "distance" between two games
def Similarity(game1, game2):
    # a = movies.iloc[movieId1]
    # b = movies.iloc[movieId2]
    
    gameA =ml[game1]
    gameB = ml[game2]
    
    return spatial.distance.cosine(gameA, gameB)


# Determining new list of games to recommend from previous recommendations and newly selected recommendation
def selectNewGames(recentSelected, gamesRecommended, newRecommendations):
    
    res = []
    a = gamesRecommended.copy()

    for i in newRecommendations[:]:
        if i in gamesRecommended:
            res.append(i)
            a.remove(i)
            # b.remove(i)
        else:
            a.append(i)
    
    # Similarity towards recently selected games
    b=[]
    for i in a:
        b.append(Similarity(recentSelected, i))
    
    # Remaining games in sorted order acc to Similarity towards recently selected game
    res+=([x for i, x in sorted(zip(b, a))])
    return res[:10]
    

# Connection to react server in front end
@app.route('/recommend/', methods=['POST'])
def members():

    userSelectedGames = json.loads((request.data).decode('UTF-8'))['list']

    res = [[0]]*len(userSelectedGames)
    gamesRecommended = []

    # Picking games from start to recently selected game
    for i in range(len(userSelectedGames)-1,-1,-1):
        if i == len(userSelectedGames)-1:
            res[i] = test_annoy_knn(indexTable[userSelectedGames[i]], 10, 16845, 'angular')
            gamesRecommended = res[i]
            print("result : ", gamesRecommended)

        else:
            # List of games similar to userSelectedGames[i]
            newRecommendations = test_annoy_knn(indexTable[userSelectedGames[i]], 10, 16845, 'angular')
            
            # Recommendation to user based on userSelectedGames[0:i] games selected by user
            gamesRecommended = selectNewGames(indexTable[userSelectedGames[i]], gamesRecommended, newRecommendations)
            print("new :" , newRecommendations)
            print("result : ", gamesRecommended)

    gamesRecommendedAppid = []

    for i in gamesRecommended:
        gamesRecommendedAppid.append(dataset['appid'][i])

    # Filtering games that are already selected by user
    for i in userSelectedGames:
        if i in gamesRecommendedAppid:
            gamesRecommendedAppid.remove(i)

    return {"list": gamesRecommendedAppid[:8]}

if __name__ == "__main__":
    app.run(debug=True)
