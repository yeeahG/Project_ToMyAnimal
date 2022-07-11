#!/usr/bin/env python
# coding: utf-8

# In[ ]:


def animalhospital(place):

    return print(*listb, sep='\n')


# In[ ]:





# In[ ]:


from selenium.webdriver.common.keys import Keys
from selenium import webdriver
import time
from selenium.webdriver.common.by import By
import pandas as pd


# In[ ]:


driver = webdriver.Chrome("D:/20220103_lab/14.python/data/chrome/103/chromedriver")
driver.get("https://map.kakao.com/")
time.sleep(3)


# In[17]:


list(range(17)).remove(0)


# In[28]:


without_advertising = list(range(17))


# In[29]:


without_advertising


# In[31]:


without_advertising.remove(0)


# In[32]:


without_advertising.remove(4)


# In[33]:


without_advertising


# In[ ]:


dimmedLayer = driver.find_element_by_css_selector("div#dimmedLayer.DimmedLayer")
dimmedLayer.click()
time.sleep(1)

search_input_tag = driver.find_element(By.ID, 'search.keyword.query')
search_input_tag.send_keys('서울 동물병원')
time.sleep(1)

search_button_tag = driver.find_element(By.ID, 'search.keyword.submit')
search_button_tag.click()
time.sleep(2)

search_place_more = driver.find_element(By.ID, 'info.search.place.more')
search_place_more.click()
time.sleep(3)

target = driver.find_element(By.XPATH, '/html/body/div[5]/div[2]/div[1]/div[7]/div[4]')


# In[ ]:


pagebutton = driver.find_element(By.XPATH, '/html/body/div[5]/div[2]/div[1]/div[7]/div[6]')


# In[ ]:


animalhospital_seoul = pd.DataFrame({ '병원이름':eval(place+"name"), '별점':eval(place+"star"), '리뷰수':eval(place+"reviewtotal"), '주소':eval(place+"addr"), '전화':eval(place+"tel") })
animalhospital_seoul['주소'] = animalhospital_seoul['주소'].apply(lambda x:x.split("\n"))
animalhospital_seoul['주소'] = animalhospital_seoul['주소'].apply(lambda x: tuple(x))
animalhospital_seoul_dropdupl = animalhospital_seoul.copy()
animalhospital_seoul_dropdupl.drop_duplicates(['병원이름', '주소'], keep = 'first')
animalhospital_seoul_dropdupl.to_csv('animalhospital_'+place+'.csv')


# In[69]:


place = "서울"


# In[70]:


'{} 동물병원'.format(place)


# In[77]:


#place = "서울"
def animalhospital(place):
    
    from selenium.webdriver.common.keys import Keys
    from selenium import webdriver
    import time
    from selenium.webdriver.common.by import By
    import pandas as pd
    
    driver = webdriver.Chrome("D:/20220103_lab/14.python/data/chrome/103/chromedriver")
    driver.get("https://map.kakao.com/")
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
    
    without_advertising = list(range(17))
    without_advertising.remove(0)
    without_advertising.remove(4)

    target = driver.find_element(By.XPATH, '/html/body/div[5]/div[2]/div[1]/div[7]/div[4]')
    pagebutton = driver.find_element(By.XPATH, '/html/body/div[5]/div[2]/div[1]/div[7]/div[6]')
    
    name_list = []
    star_list = []
    reviewtotal_list = []
    addr_list = []
    tel_list = []
    
    page = range(50)
    try:
        for ultag in target.find_elements(By.XPATH, "./ul[1]"):
            if ultag.text != "":
                for k in page:
                    for j in range(5):
                        pagebutton_12345 = pagebutton.find_element(By.XPATH, "./div[1]/a[{}]".format(j+1))
                        pagebutton_12345.click()
                        time.sleep(1)
                        for i in without_advertising:

                            print("--------------------------")
                            print(i)

                            subli = ultag.find_element(By.XPATH, "./li[{}]".format(i))
                            name = subli.find_element(By.XPATH, "./div[3]/strong/a[2]")
                            star = subli.find_element(By.XPATH, "./div[4]/span[1]/em")
                            reviewtotal = subli.find_element(By.XPATH, "./div[4]/span[1]/a")
                            addr = subli.find_element(By.XPATH, "./div[5]/div[2]")
                            tel = subli.find_element(By.XPATH, "./div[5]/div[4]/span[1]")

                            print(name.text, "= name")
                            print(star.text, "= star")
                            print(reviewtotal.text, "= reviewtotal")
                            print(addr.text, "= addr")
                            print(tel.text, "= tel")

                            name_list.append(name.text)
                            star_list.append(star.text)
                            reviewtotal_list.append(reviewtotal.text)
                            addr_list.append(addr.text)
                            tel_list.append(tel.text)

                        if j == 4 :
                            pagebutton_next = pagebutton.find_element(By.XPATH, "./div[1]/button[2]")
                            pagebutton_next.click()
                            time.sleep(1)

    except:
        animalhospital_df = pd.DataFrame({ '병원이름':name_list, '별점':star_list, '리뷰수':reviewtotal_list, '주소':addr_list, '전화':tel_list })
        #animalhospital_df['주소'] = animalhospital_seoul['주소'].apply(lambda x:x.split("\n"))
        #animalhospital_df['주소'] = animalhospital_seoul['주소'].apply(lambda x: tuple(x))
        animalhospital_df['주소'] = animalhospital_df['주소'].apply(lambda x: tuple(x.split("\n")))
        animalhospital_df_dropdupl = animalhospital_df.copy()
        animalhospital_df_dropdupl.drop_duplicates(['병원이름', '주소'], keep = 'first')
        animalhospital_df_dropdupl.to_csv('animalhospital_'+place+'.csv')


# In[78]:


animalhospital("인천")


# In[ ]:





# In[79]:


from selenium.webdriver.common.keys import Keys
from selenium import webdriver
import time
from selenium.webdriver.common.by import By
import pandas as pd


# In[84]:


place = "대전"
driver = webdriver.Chrome("D:/20220103_lab/14.python/data/chrome/103/chromedriver")
driver.get("https://map.kakao.com/")
time.sleep(3)


# In[85]:


dimmedLayer = driver.find_element_by_css_selector("div#dimmedLayer.DimmedLayer")
dimmedLayer.click()
time.sleep(1)


# In[86]:


search_input_tag = driver.find_element(By.ID, 'search.keyword.query')
search_input_tag.send_keys('{} 동물병원'.format(place))
time.sleep(1)


# In[87]:


search_button_tag = driver.find_element(By.ID, 'search.keyword.submit')
search_button_tag.click()
time.sleep(2)


# In[88]:


search_place_more = driver.find_element(By.ID, 'info.search.place.more')
search_place_more.click()
time.sleep(1)


# In[93]:


pagebutton = driver.find_element(By.XPATH, '/html/body/div[5]/div[2]/div[1]/div[7]/div[6]')
pagebutton_1 = pagebutton.find_element(By.XPATH, "./div[1]/a[1]")
pagebutton_1.click()
time.sleep(1)


# In[ ]:





# In[105]:


place = "대전"
driver = webdriver.Chrome("D:/20220103_lab/14.python/data/chrome/103/chromedriver")
driver.get("https://map.kakao.com/")
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
# 대전 동물병원 검색하고 더보기를 눌렀더니 2페이지부터 시작해서 크롤링이 정상적으로 되지않아 1을 먼저 눌러줌

without_advertising = list(range(17))
without_advertising.remove(0)
without_advertising.remove(4)

#target = driver.find_element(By.XPATH, '/html/body/div[5]/div[2]/div[1]/div[7]/div[4]')
# 서울을 검색했을땐 타겟이 잘맞지만 대전을 검색하면 3번째 div에 busstops가 생김. (서울은 5번째에 있음)

target = driver.find_element(By.XPATH, '/html/body/div[5]/div[2]/div[1]/div[7]')

name_list = []
star_list = []
reviewtotal_list = []
addr_list = []
tel_list = []


# In[103]:


target = driver.find_element(By.XPATH, '/html/body/div[5]/div[2]/div[1]/div[7]')


# In[106]:


target_searchplace = driver.find_element(By.ID, 'info.search.place')


# In[109]:


zeroless16 = list(range(16))


# In[110]:


zeroless16.remove(0)


# In[111]:


page = range(50)
for ultag in target_searchplace.find_elements(By.XPATH, "./ul[1]"):
    if ultag.text != "":
        for k in page:
            for j in range(5):
                pagebutton_12345 = pagebutton.find_element(By.XPATH, "./div[1]/a[{}]".format(j+1))
                pagebutton_12345.click()
                time.sleep(1)
                for i in zeroless16:
                    # 서울을 크롤링할땐 4번째 칸에 광고가 있어서 
                    # without_advertising를 0과 4를 뺀 리스트로 만들어서 for문에 넣었었는데
                    # 대전을 해보니 첫번째 페이지에 광고가 5번째 칸에있어서 (나머지는 4)
                    # try except로 바꾸기로 했다.

                    print("--------------------------")
                    print(i)

                    subli = ultag.find_element(By.XPATH, "./li[{}]".format(i))
                    try :
                        name = subli.find_element(By.XPATH, "./div[3]/strong/a[2]")
                        star = subli.find_element(By.XPATH, "./div[4]/span[1]/em")
                        reviewtotal = subli.find_element(By.XPATH, "./div[4]/span[1]/a")
                        addr = subli.find_element(By.XPATH, "./div[5]/div[2]")
                        tel = subli.find_element(By.XPATH, "./div[5]/div[4]/span[1]")

                        print(name.text, "= name")
                        print(star.text, "= star")
                        print(reviewtotal.text, "= reviewtotal")
                        print(addr.text, "= addr")
                        print(tel.text, "= tel")

                        name_list.append(name.text)
                        star_list.append(star.text)
                        reviewtotal_list.append(reviewtotal.text)
                        addr_list.append(addr.text)
                        tel_list.append(tel.text)
                    except:
                        print("광고")

                if j == 4 :
                    pagebutton_next = pagebutton.find_element(By.XPATH, "./div[1]/button[2]")
                    pagebutton_next.click()
                    time.sleep(1)


# In[112]:


animalhospital_df = pd.DataFrame({ '병원이름':name_list, '별점':star_list, '리뷰수':reviewtotal_list, '주소':addr_list, '전화':tel_list })
animalhospital_df['주소'] = animalhospital_df['주소'].apply(lambda x: tuple(x.split("\n")))
animalhospital_df_dropdupl = animalhospital_df.copy()
animalhospital_df_dropdupl.drop_duplicates(['병원이름', '주소'], keep = 'first')
animalhospital_df_dropdupl.to_csv('animalhospital_'+place+'.csv')


# In[ ]:




