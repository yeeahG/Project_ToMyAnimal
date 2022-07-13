#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd


# In[2]:


csv_광주 = pd.read_csv('D:/20220103_lab/14.python/finalproject/동물병원csv/animalhospital_광주.csv')


# In[3]:


csv_광주.columns


# In[7]:


csv_광주.drop(['Unnamed: 0'], axis=1, inplace=True)


# ### type column 컬럼 추가하기
# - 동물병원 0
# - 동물훈련소 1

# In[8]:


csv_광주['location_type'] = 0


# In[9]:


csv_광주


# In[10]:


place_list = {"광주", "대구", "대전", "부산", "서울", "울산", "인천"}


# In[11]:


csv_대구 = pd.read_csv('D:/20220103_lab/14.python/finalproject/동물병원csv/animalhospital_대구.csv')


# In[12]:


csv_대전 = pd.read_csv('D:/20220103_lab/14.python/finalproject/동물병원csv/animalhospital_대전.csv')


# In[13]:


csv_부산 = pd.read_csv('D:/20220103_lab/14.python/finalproject/동물병원csv/animalhospital_부산.csv')


# In[14]:


csv_서울 = pd.read_csv('D:/20220103_lab/14.python/finalproject/동물병원csv/animalhospital_서울.csv')


# In[15]:


csv_울산 = pd.read_csv('D:/20220103_lab/14.python/finalproject/동물병원csv/animalhospital_울산.csv')


# In[16]:


csv_인천 = pd.read_csv('D:/20220103_lab/14.python/finalproject/동물병원csv/animalhospital_인천.csv')


# In[17]:


csv_list = [csv_대구, csv_대전, csv_부산, csv_서울, csv_울산, csv_인천]


# In[18]:


for i in csv_list:
    i.drop(['Unnamed: 0'], axis=1, inplace=True)
    i['location_type'] = 0


# In[19]:


csv_대전


# In[20]:


csv_대구


# In[21]:


csv_부산


# In[29]:


csv_서울


# In[30]:


csv_울산


# In[24]:


csv_인천


# In[32]:


for csv_l, place_l in zip(csv_list, place_list):
    csv_l.to_csv('animalhospital_{}.csv'.format(place_l))


# In[33]:


# 이전에 서울이 잘 생성됐는데 코드 수정후 csv로 다시 변환하니까 서울만 생성이안되서 따로 생성해줌
csv_서울.to_csv('animalhospital_서울.csv')


# In[ ]:





# ### 반려동물훈련소

# In[34]:


pet_tc_csv = pd.read_csv('D:/20220103_lab/14.python/finalproject/반려동물훈련소csv/pet_training_center.csv')
pet_tc_csv.drop(['Unnamed: 0'], axis=1, inplace=True)
pet_tc_csv['location_type'] = 1
pet_tc_csv.to_csv("pet_training_center.csv")


# In[ ]:




