#!/usr/bin/env python
# coding: utf-8

# In[1]:


from selenium.webdriver.common.keys import Keys
from selenium import webdriver
import time
from selenium.webdriver.common.by import By


# In[14]:


driver = webdriver.Chrome("D:/20220103_lab/14.python/data/chrome/103/chromedriver")
driver.get("https://map.kakao.com/")
time.sleep(3)


# 서울, 대전, 대구, 부산, 인천, 울산, 광주

# In[5]:


# 서울 seoul
seoulname = []
seoulstar = []
seoulreviewtotal = []
seouladdr = []
seoultel = []


# In[6]:


# 대전 daejeon
daejeonname = []
daejeonstar = []
daejeonreviewtotal = []
daejeonaddr = []
daejeontel = []


# In[7]:


# 대구 daegu
daeguname = []
daegustar = []
daegureviewtotal = []
daeguaddr = []
daegutel = []


# In[8]:


# 부산 busan
busanname = []
busanstar = []
busanreviewtotal = []
busanaddr = []
busantel = []


# In[9]:


# 인천 incheon
incheonname = []
incheonstar = []
incheonreviewtotal = []
incheonaddr = []
incheontel = []


# In[10]:


# 울산 ulsan
ulsanname = []
ulsanstar = []
ulsanreviewtotal = []
ulsanaddr = []
ulsantel = []


# In[11]:


# 광주 gwangju
gwangjuname = []
gwangjustar = []
gwangjureviewtotal = []
gwangjuaddr = []
gwangjutel = []


# In[17]:


view = driver.find_element(By.ID, 'view')
view.click()


# In[19]:


# 아무데나 한번 눌러야 '지도설정' 이라는게 없어져서 search_button_tag가 먹습니다.
# 화면부분을 지정하고 click() 해보았지만 사라지지않아서 마우스로 직접 눌렀습니다.


# In[20]:


# 키워드 입력, 검색버튼 클릭, 장소 더보기 클릭
search_input_tag = driver.find_element(By.ID, 'search.keyword.query')
search_input_tag.send_keys('서울 동물병원')
time.sleep(1)

search_button_tag = driver.find_element(By.ID, 'search.keyword.submit')
search_button_tag.click()
time.sleep(2)

search_place_more = driver.find_element(By.ID, 'info.search.place.more')
search_place_more.click()
time.sleep(3)


# In[21]:


target = driver.find_element(By.XPATH, '/html/body/div[5]/div[2]/div[1]/div[7]/div[4]')
# div id="info.search.place" class="section places lst">


# In[27]:


target.text


# In[22]:


without_advertising = list(range(16))


# In[23]:


without_advertising.remove(0)


# In[24]:


without_advertising


# In[25]:


without_advertising.append(16)


# In[28]:


without_advertising.remove(4) # 광고삭제


# In[29]:


without_advertising


# In[30]:


pagebutton = driver.find_element(By.XPATH, '/html/body/div[5]/div[2]/div[1]/div[7]/div[6]')
# <div id="info.search.page" class="pages">


# In[31]:


pagebutton.text


# In[34]:


# place 바꿔서 코드 재활용

place = "seoul"

page = range(30)
for ultag in target.find_elements(By.XPATH, "./ul[1]"):
    if ultag.text != "":
        for k in page:
            for j in range(5):
                pagebutton2 = pagebutton.find_element(By.XPATH, "./div[1]/a[{}]".format(j+1))
                pagebutton2.click()
                time.sleep(3)
                print("page =", k)
                print("****************************")
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
                    eval(place+"name").append(name.text)
                    eval(place+"star").append(star.text)
                    eval(place+"reviewtotal").append(reviewtotal.text)
                    eval(place+"addr").append(addr.text)
                    eval(place+"tel").append(tel.text)            
                if j == 4 :
                    pagebutton_next = pagebutton.find_element(By.XPATH, "./div[1]/button[2]")
                    pagebutton_next.click()
                    time.sleep(3)


# In[43]:


print(len(seoulname))
print(len(seoulstar))
print(len(seoulreviewtotal))
print(len(seouladdr))
print(len(seoultel))


# In[44]:


seoulname


# In[45]:


import pandas as pd


# In[ ]:


pd.DataFrame


# In[46]:


animalhospital_seoul = pd.DataFrame({ '병원이름':seoulname, '별점':seoulstar, '리뷰수':seoulreviewtotal, '주소':seouladdr, '전화':seoultel })


# In[47]:


animalhospital_seoul


# In[54]:


animalhospital_seoul['주소'][0].split("\n")


# In[58]:


animalhospital_seoul['주소'] = animalhospital_seoul['주소'].apply(lambda x:x.split("\n"))


# In[64]:


animalhospital_seoul.isnull().sum()


# In[66]:


animalhospital_seoul


# In[71]:


animalhospital_seoul.duplicated()


# ??

# In[70]:


animalhospital_seoul.info()


# ### TypeError: unhashable type: 'list'
# list는 "변경 가능한 데이터 타입"이기 때문에
# 리스트를 기준으로 중복 확인을 못 하겠다는 뜻이다.<br>
# 이러한 경우는 "변경 불가능한 데이터 타입"인 튜플로 바꿔준 다음, 중복 처리를 하는 것이 좋다.<br>
# 출처: https://sy-log.tistory.com/60 [서윤로그:티스토리]

# In[72]:


animalhospital_seoul.duplicated("병원이름")


# In[73]:


animalhospital_seoul.duplicated("별점")


# In[74]:


animalhospital_seoul.duplicated("리뷰수")


# In[75]:


animalhospital_seoul.duplicated("주소")


# In[76]:


animalhospital_seoul.duplicated("전화")


# - 주소 컬럼때문에 에러.

# In[78]:


animalhospital_seoul['주소'] = animalhospital_seoul['주소'].apply(lambda x: tuple(x))


# In[80]:


animalhospital_seoul.duplicated()
# 주소 컬럼을 튜플로 바꿔주고 되는모습


# In[81]:


animalhospital_seoul.duplicated().sum()
# 별점과 리뷰수 중복에 의미가 없다 생각함


# In[87]:


animalhospital_seoul[['병원이름', '주소', '전화']].duplicated().sum()
# 같은게 많다..?


# In[89]:


animalhospital_seoul['병원이름'].value_counts()
# 이름이 같을수도 있지. 지역이 다르면 돼


# In[98]:


animalhospital_seoul['주소'].value_counts()


# In[97]:


(animalhospital_seoul['주소'].value_counts() > 1).sum()
# 생각보다 중복되는게 많다


# In[105]:


animalhospital_seoul[['병원이름', '주소']][animalhospital_seoul[['병원이름', '주소']].duplicated() == True]
# 이것들이 중복이된다.


# In[106]:


animalhospital_seoul_dropdupl = animalhospital_seoul.copy()


# In[107]:


animalhospital_seoul_dropdupl.drop_duplicates(['병원이름', '주소'], keep = 'first')
# 원래 데이터에서 중복값 150개가 빠진 500개의 로우


# In[108]:


animalhospital_seoul


# In[109]:


animalhospital_seoul_dropdupl.to_csv('animalhospital_seoul.csv')


# In[ ]:





# ## 함수로 만들어보자

# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:




