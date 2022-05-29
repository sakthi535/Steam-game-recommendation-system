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

    return t.get_nns_by_item(index, 11)[1:]

# Dictionary where each key represents app id of each game in dataframe and value represents the index positions in it 
indexTable = {v: k for k, v in dataset['appid'].items()}


def Similarity(movieId1, movieId2):
    # a = movies.iloc[movieId1]
    # b = movies.iloc[movieId2]
    
    gameA =ml[movieId1]
    gameB = ml[movieId2]
    
    if(len(gameA) != len(gameB)):
        print(movieId2)
        print("HERRRRREEE")
        return 100

    return spatial.distance.cosine(gameA, gameB)



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
    
    b=[]
    for i in a:
        b.append(Similarity(recentSelected, i))
    
    res+=([x for i, x in sorted(zip(b, a))])
    return res[:10]
    


@app.route('/recommend/', methods=['POST'])
def members():

    userSelectedGames = json.loads((request.data).decode('UTF-8'))['list']

    res = [[0]]*len(userSelectedGames)
    gamesRecommended = []

    for i in range(len(userSelectedGames)-1,-1,-1):
        if i == len(userSelectedGames)-1:
            res[i] = test_annoy_knn(indexTable[userSelectedGames[i]], 10, 16845, 'angular')
            gamesRecommended = res[i]
            print("result : ", gamesRecommended)

        else:
            newRecommendations = test_annoy_knn(indexTable[userSelectedGames[i]], 10, 16845, 'angular')
            gamesRecommended = selectNewGames(indexTable[userSelectedGames[i]], gamesRecommended, newRecommendations)
            print("new :" , newRecommendations)
            print("result : ", gamesRecommended)

    # res = test_annoy_knn(indexTable[userSelectedGames[0]], 10, 16845, 'angular')


    gamesRecommendedAppid = []

    for i in gamesRecommended:
        gamesRecommendedAppid.append(dataset['appid'][i])

    # print(gamesRecommended)
    # print(gamesRecommendedAppid)

    return {"list": gamesRecommendedAppid}

if __name__ == "__main__":
    app.run(debug=True)
