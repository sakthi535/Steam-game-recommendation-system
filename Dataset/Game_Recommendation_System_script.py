import pandas as pd
import matplotlib.pyplot as plt
plt.style.use('fivethirtyeight')
import seaborn as sns
import numpy as np
import json
import warnings
warnings.filterwarnings('ignore')
import base64
import io
from matplotlib.pyplot import imread
import codecs
from IPython.display import HTML
import re
from annoy import AnnoyIndex

movies = pd.read_csv('steam_games.csv')

movies = movies.drop(['desc_snippet','genre','publisher','game_description','languages','recent_reviews','types','achievements','minimum_requirements','recommended_requirements','original_price','discount_price'], axis=1)

movies['mature_content'] = movies['mature_content'].fillna(0)
for i in range(movies.mature_content.size):
    if(movies.mature_content[i]!=0):
        movies.mature_content[i] = 1
    else:
        movies.mature_content[i] = 0


movies.dropna(inplace=True)
movies.reset_index(drop=True, inplace=True)

movies['popular_tags'] = (movies['game_details']+movies['popular_tags'])

my_list=[]
for i in range(movies['popular_tags'].size):
    movies['popular_tags'][i] = (movies['popular_tags'][i].split(",")) 

for i in range(movies['release_date'].size):
        movies['release_date'][i] = movies['release_date'][i][-4:]


for i in range(movies['all_reviews'].size):
    if(type(movies['all_reviews'][i]) == int):
        pass
    elif(movies['all_reviews'][i][0] >= '0' and movies['all_reviews'][i][0] <='9'):
        movies['all_reviews'][i]=0
    elif(movies['all_reviews'][i][0] == 'N' or movies['all_reviews'][i][5] == 'N'):
        movies['all_reviews'][i]=0
    else:
        movies['all_reviews'][i] = int(re.findall('\d*%', movies['all_reviews'][i])[0][0:2])
movies = movies[movies['all_reviews']!=0]

movies.reset_index(drop=True, inplace=True)

for i,j in zip(movies['popular_tags'],movies.index):
    list2=[]
    list2=i
    list2.sort()
    movies.loc[j,'popular_tags']=str(list2)
movies['popular_tags'] = movies['popular_tags'].str.strip('[]').str.replace(' ','').str.replace("'",'')
movies['popular_tags'] = movies['popular_tags'].str.split(',')

popularTagList = []
for index, row in movies.iterrows():
    popular_tags = row["popular_tags"]
    
    for popular_tag in popular_tags:
        if popular_tag not in popularTagList:
            popularTagList.append(popular_tag)

def binary(genre_list):
    binaryList = []
    
    for genre in popularTagList:
        if genre in genre_list:
            binaryList.append(1)
        else:
            binaryList.append(0)
    
    return binaryList

movies['popular_tags_bin'] = movies['popular_tags'].apply(lambda x: binary(x))
movies['popular_tags_bin']

ml=[]
for i in movies['popular_tags_bin']:
    ml.append(np.array(i))
ml = np.array(ml)

df2 = movies[['url','name','all_reviews','release_date','developer','popular_tags','mature_content']]

def numeric_till_String(test_str):
    temp = 0
    while (test_str[temp] != '/'): 
        if(temp == len(test_str) -1 ):
            break
        temp+=1
    
    if(test_str[0 : temp] == ''):
        return -1
           
    return int(test_str[0 : temp])


df2_appid = []

for i in range(movies['url'].size):
    df2_appid.append(numeric_till_String(movies['url'][i][35:]))

df2['appid'] = df2_appid

import pickle

pickle.dump(df2.to_dict(),open('meta_games_dict.pkl','wb'))

pickle.dump(ml,open('confusion_matrix_con.pkl','wb'))

json_object = json.dumps(df2.to_dict(), indent = 4)
  
# Writing to sample.json
with open("dataset.json", "w") as outfile:
    outfile.write(json_object)

with open("./../react-server/src/dataset.json", "w") as outfile:
    outfile.write(json_object)


