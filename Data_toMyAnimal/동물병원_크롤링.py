#!/usr/bin/env python
# coding: utf-8

# In[7]:


from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import pandas as pd


# In[8]:


def animalhospital(place):
    
    path="D:/20220103_lab/14.python/data/chrome/103/chromedriver"
    driver = webdriver.Chrome(path)
    url="https://map.kakao.com/"
    driver.get(url)
    time.sleep(3)

    dimmedLayer = driver.find_element_by_css_selector("div#dimmedLayer.DimmedLayer")
    dimmedLayer.click()
    time.sleep(1)

    search_input_tag = driver.find_element(By.ID, 'search.keyword.query')
    search_input_tag.send_keys('{} 동물병원'.format(place))
    time.sleep(1)

    search_button_tag = driver.find_element(By.ID, 'search.keyword.submit')
    search_button_tag.click()
    time.sleep(2)

    search_place_more = driver.find_element(By.ID, 'info.search.place.more')
    search_place_more.click()
    time.sleep(1)

    pagebutton = driver.find_element(By.XPATH, '/html/body/div[5]/div[2]/div[1]/div[7]/div[6]')
    pagebutton_1 = pagebutton.find_element(By.XPATH, "./div[1]/a[1]")
    pagebutton_1.click()
    time.sleep(1) 
    
    target = driver.find_element(By.XPATH, '/html/body/div[5]/div[2]/div[1]/div[7]')
    target_searchplace = driver.find_element(By.ID, 'info.search.place')

    zeroless16 = list(range(16))
    zeroless16.remove(0)

    name_list = []
    star_list = []
    reviewtotal_list = []
    addr_list = []
    tel_list = []


    page = range(50)
    try:
        for ultag in target_searchplace.find_elements(By.XPATH, "./ul[1]"):
            if ultag.text != "":
                for k in page:
                    for j in range(5):
                        pagebutton_12345 = pagebutton.find_element(By.XPATH, "./div[1]/a[{}]".format(j+1))
                        pagebutton_12345.click()
                        time.sleep(1)
                        for i in zeroless16:
                            subli = ultag.find_element(By.XPATH, "./li[{}]".format(i))
                            try :
                                name = subli.find_element(By.XPATH, "./div[3]/strong/a[2]")
                                star = subli.find_element(By.XPATH, "./div[4]/span[1]/em")
                                reviewtotal = subli.find_element(By.XPATH, "./div[4]/span[1]/a")
                                addr = subli.find_element(By.XPATH, "./div[5]/div[2]")
                                tel = subli.find_element(By.XPATH, "./div[5]/div[4]/span[1]")

                                name_list.append(name.text)
                                star_list.append(star.text)
                                reviewtotal_list.append(reviewtotal.text)
                                addr_list.append(addr.text)
                                tel_list.append(tel.text)
                            except:
                                print("광고 필터링")

                        if j == 4 :
                            pagebutton_next = pagebutton.find_element(By.XPATH, "./div[1]/button[2]")
                            pagebutton_next.click()
                            time.sleep(1)
                        
    except:
        animalhospital_df = pd.DataFrame({ '병원이름':name_list, '별점':star_list, '리뷰수':reviewtotal_list, '주소':addr_list, '전화':tel_list })
        animalhospital_df['주소'] = animalhospital_df['주소'].apply(lambda x: x.replace("\n", ", "))
        animalhospital_df_dropdupl = animalhospital_df.copy()
        animalhospital_df_dropdupl.drop_duplicates(['병원이름', '주소'], keep = 'first')
        animalhospital_df_dropdupl['location_type'] = 0
        animalhospital_df_dropdupl.to_csv('animalhospital_'+place+'.csv', index=False)
        print(place + "동물병원 크롤링 완료")


# In[9]:


placelist = ["서울", "대전", "대구", "부산", "광주", "울산", "인천"]


# In[4]:


for i in placelist:
    animalhospital(i)


# In[11]:


from datetime import datetime
now = datetime.now()
print("current time is", now)


# In[ ]:




