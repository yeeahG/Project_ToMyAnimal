#!/usr/bin/env python
# coding: utf-8

# cmd 에서 pip install pymysql 먼저 하고 (이미 설치 되어있을듯)

# In[1]:


import pymysql


# 연결하고싶은 db 지정하고 연결. 127.0.0.1은 root ip인듯

# In[2]:


conn = pymysql.connect(host='127.0.0.1', user='root', port=3306, password='1234', db='testpysql', charset='utf8')


# In[3]:


cur = conn.cursor()


# In[4]:


# 테이블 삭제코드
sql = "DROP TABLE IF EXISTS userTable"
cur.execute(sql)


# table 생성

# In[5]:


cur.execute("CREATE TABLE usertable (hospital_name VARCHAR(50), star VARCHAR(10), review_count VARCHAR(10), addr VARCHAR(99), tel VARCHAR(50), location_type VARCHAR(255))")


# In[6]:


conn.commit()


# In[ ]:





# sql = usertable에 넣겠다. ( usertable 컬럼들 ) values ( 들어올 데이터의 형식 ? )

# In[7]:


sql = """INSERT INTO usertable (hospital_name, star, review_count, addr, tel, location_type) values (%s, %s, %s, %s, %s, %s)"""


# In[8]:


import csv


# f = open("csv파일 경로")

# In[9]:


f = open("D:/20220103_lab/14.python/finalproject/동물병원csv + 인덱스삭제/animalhospital_서울.csv", 'r', encoding='utf-8')
rd = csv.reader(f)
for line in rd:
    cur.execute(sql, (line[0], line[1], line[2], line[3], line[4], line[5]))


# 컬럼을 hospital_name, star, review_count, addr, tel, location_type. 6개를 사용해서 라인이 0~5

# In[10]:


conn.commit()


# In[ ]:


conn.close()


# In[ ]:


f.close()

