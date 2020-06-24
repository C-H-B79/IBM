import requests
import lxml.html
import json
from meishi import useragentutil
import os

list_contents=[]
def get_content(href):
    response = requests.get(href, headers=useragentutil.get_headers())
    html = response.content.decode()
    met = lxml.html.etree
    list_l = met.HTML(html)
    list_content={}
    content=list_l.xpath("//div[@class='cp_body_left']/div[@class='materials']/p/text()")
    list_b=list_l.xpath("//div[@class='editnew edit']/div[@class='content clearfix']")
    list_step=[]
    for list_a in list_b:
        list_steps={}
        list_c=list_a.xpath("./div[@class='c']/p//text()")
        list_d = list_a.xpath("./div[@class='c']/p/img/@src")
        list_steps['text']=list_c
        list_steps['img']=list_d
        list_step.append(list_steps)
    list_content['text']=content
    list_content['step']=list_step
    return list_content




def get_infos(href):
    response=requests.get(href,headers=useragentutil.get_headers())
    html=response.content.decode()
    met=lxml.html.etree
    list_l=met.HTML(html)
    list_a=list_l.xpath("//div[@class='listtyle1_w']/div[@class='listtyle1_list clearfix']/div[@class='listtyle1']")
    for list_b in list_a:
        list_con={}
        href=list_b.xpath("./a/@href")[0]
        list_content=get_content(href)
        name=list_b.xpath("./a/@title")[0]
        img=list_b.xpath("./a/img/@src")[0]
        list_con['name']=name
        list_con['img']=img
        list_con['list_content'] = list_content
        list_contents.append(list_con)
    return list_contents



def get_info(url):
    response=requests.get(url,headers=useragentutil.get_headers())
    html=response.content.decode()
    met=lxml.html.etree
    list_l=met.HTML(html)
    list_b=list_l.xpath("//div[@class='other_c listnav_con clearfix']/dl[@class='listnav_dl_style1 w990 clearfix']/dd")
    for list_a in list_b:
        href=list_a.xpath("./a/@href")[0]
        list_contents=get_infos(href)
    return list_contents


def save_json(list_conts):
    path="foodfile"
    if not os.path.exists(path):
        os.mkdir(path)
    file=open(path+"/foods_list.json","w",encoding="utf-8")
    json.dump(
        list_conts,
        file,
        ensure_ascii=False,
        indent=2
    )


def main():
    url="https://www.meishij.net/china-food/xiaochi/"
    list_conts=get_info(url)
    save_json(list_conts)

if __name__ == '__main__':
    main()