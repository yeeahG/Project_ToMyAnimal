#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd


# In[37]:


csv_광주 = pd.read_csv('D:/20220103_lab/14.python/finalproject/동물병원csv/animalhospital_광주.csv')


# In[39]:


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


# In[74]:


place_list = ["광주", "대구", "대전", "부산", "서울", "울산", "인천"]


# In[41]:


csv_대구 = pd.read_csv('D:/20220103_lab/14.python/finalproject/동물병원csv/animalhospital_대구.csv')


# In[42]:


csv_대전 = pd.read_csv('D:/20220103_lab/14.python/finalproject/동물병원csv/animalhospital_대전.csv')


# In[43]:


csv_부산 = pd.read_csv('D:/20220103_lab/14.python/finalproject/동물병원csv/animalhospital_부산.csv')


# In[44]:


csv_서울 = pd.read_csv('D:/20220103_lab/14.python/finalproject/동물병원csv/animalhospital_서울.csv')


# In[45]:


csv_울산 = pd.read_csv('D:/20220103_lab/14.python/finalproject/동물병원csv/animalhospital_울산.csv')


# In[46]:


csv_인천 = pd.read_csv('D:/20220103_lab/14.python/finalproject/동물병원csv/animalhospital_인천.csv')


# In[47]:


csv_list = [csv_광주, csv_대구, csv_대전, csv_부산, csv_서울, csv_울산, csv_인천]


# In[48]:


for i in csv_list:
    i.drop(['Unnamed: 0'], axis=1, inplace=True)
    i['location_type'] = 0


# In[55]:


csv_광주


# In[49]:


csv_대전


# In[50]:


csv_대구


# In[51]:


csv_부산


# In[52]:


csv_서울


# In[53]:


csv_울산


# In[54]:


csv_인천


# In[76]:


for csv_l, place_l in zip(csv_list, place_list):
    csv_l.to_csv('animalhospital_{}.csv'.format(place_l), index=False)


# In[ ]:





# ### 반려동물훈련소

# In[77]:


pet_tc_csv = pd.read_csv('D:/20220103_lab/14.python/finalproject/반려동물훈련소csv/pet_training_center.csv')
pet_tc_csv.drop(['Unnamed: 0'], axis=1, inplace=True)
pet_tc_csv['location_type'] = 1
pet_tc_csv.to_csv("pet_training_center.csv", index=False)


# In[ ]:




