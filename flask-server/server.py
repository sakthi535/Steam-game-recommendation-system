from flask import Flask
from flask import request
import json
from annoy import AnnoyIndex

import numpy as np
import pandas as pd
import time
import pickle

app = Flask(__name__)

# Read Dataframe and confusion matrix developed from python notebook
dataset = pickle.load(open('../Dataset/meta_games_dict.pkl','rb'))
ml = pickle.load(open('../Dataset/condusion_matrix_con.pkl','rb'))

#Using ANNOY library, finding recommendation for user selection
def test_annoy_knn(index, Ntrees, Nsamples, method = "euclidean"):
    
    vector_length = index.size
    t = AnnoyIndex(vector_length, metric = method)

    for i,v in zip(range(Nsamples), ml[:Nsamples]):
        t.add_item(i, v)

    t.build(Ntrees)

    return t.get_nns_by_item(index, 8)

# Dictionary where each key represents app id of each game in dataframe and value represents the index positions in it 
indexTable = {v: k for k, v in dataset['appid'].items()}

@app.route('./recommend', method=['POST'])
def members():

    userSelectedGames = json.loads((request.data).decode('UTF-8'))['list']

    res = test_annoy_knn(indexTable[userSelectedGames[0]], 10, 16845, 'angular')

    gamesRecommended = []

    for i in res:
        gamesRecommended.append(dataset['appid'])

    return {"list": gamesRecommended}

if __name__ == "__main__":
    app.run(debug=True)
