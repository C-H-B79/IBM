import requests
from meishi import useragentutil
import lxml.html
import json
import os

list_contents=[]
def read_zhushi_caipu(href):
    """获取主食菜谱"""
    caipu = {}
    zhushi_caipu_response = requests.get(href, headers=useragentutil.get_headers())
    html_content = zhushi_caipu_response.content.decode()
    """提取美食信息"""
    metree = lxml.html.etree
    list_l = metree.HTML(html_content)
    list_content = {}
    content = list_l.xpath("//div[@class='cp_body_left']/div[@class='materials']/p/text()")
    list_b = list_l.xpath("//div[@class='editnew edit']/div[@class='content clearfix']")
    list_step = []
    for list_a in list_b:
        list_steps = {}
        list_c = list_a.xpath("./div[@class='c']/p//text()")
        list_d = list_a.xpath("./div[@class='c']/p/img/@src")
        list_steps['text'] = list_c
        list_steps['img'] = list_d
        list_step.append(list_steps)
    list_content['text'] = content
    list_content['step'] = list_step
    return list_content


def parse_zhushi_url(http_url):
    """获取整个网页数据"""
    zhushi_response = requests.get(http_url, headers=useragentutil.get_headers())
    html_content = zhushi_response.content.decode()
    """提取美食信息"""
    metree = lxml.html.etree
    zhushi_info_parser = metree.HTML(html_content)
    list_c = zhushi_info_parser.xpath("//div[@class='listtyle1_w']/div[@class='listtyle1_list clearfix']/div[@class='listtyle1']")
    infos = []
    for list_b in list_c:
        info = {}
        li_list_href = list_b.xpath("./a/@href")[0]
        name=list_b.xpath("./a/@title")[0]
        img = list_b.xpath("./a/img/@src")[0]
        # 遍历链接菜谱的地址，前往下载视频
        list_content = read_zhushi_caipu(li_list_href)
        info['name'] = name
        info['img'] = img
        info['list_content'] = list_content
        list_contents.append(info)
    print(list_contents)
    return list_contents

def save_zhushi_file(datas):
    """以json保存文件,主食菜谱的数据信息"""
    # 不存在保存路劲则创建该路径
    zhushi_name = "./foodfile"
    if not os.path.exists(zhushi_name):
        os.makedirs(zhushi_name)
    # 保存数据
    zhushi_file = open(zhushi_name + "/zhushi.json", "w", encoding="utf-8")
    json.dump(datas,
              zhushi_file,
              ensure_ascii=False,
              indent=2)
    print("主食菜谱信息已保存成功！")

def main():
    """获取网页的数据"""
    for i in range(1,57):
        zhushi_url = "https://www.meishij.net/chufang/diy/jiangchangcaipu/?&page={}".format(i)
        zhushi_info_datas = parse_zhushi_url(zhushi_url)
    #保存信息
    save_zhushi_file(zhushi_info_datas)

if __name__=='__main__':
    main()