insert into user_info (uid,pwd,email,name,date) values('test','1234','aaa@aaa.com','kim',now());
select * from user_info;

insert into category(title,level,parent,url) values ('사각도시락',1,-1,'square');
insert into category(title,level,parent,url) values ('보울도시락',1,-1,'bowl');
insert into category(title,level,parent,url) values ('프리미엄/고메이',1,-1,'premium');

insert into category(title,level,parent,url) values ('프리미엄',2,3,'premiumLv2');

insert into category(title,level,parent,url) values ('고기고기시리즈',2,1,'meatmeat');
insert into category(title,level,parent,url) values ('모둠시리즈',2,1,'modum');
insert into category(title,level,parent,url) values ('정식시리즈',2,1,'jungsik');

insert into category(title,level,parent,url) values ('마요',2,2,'mayo');
insert into category(title,level,parent,url) values ('카레',2,2,'curry');
insert into category(title,level,parent,url) values ('볶음밥',2,2,'friedrice');
insert into category(title,level,parent,url) values ('프리미엄 찌개/탕',2,2,'soup');
insert into category(title,level,parent,url) values ('덮밥',2,2,'toppingrice');
insert into category(title,level,parent,url) values ('비빔밥',2,2,'bibimbab');
insert into category(title,level,parent,url) values ('어린이도시락',2,2,'child');
insert into category(title,level,parent,url) values ('파스타',2,2,'pasta');

select * from category;
insert into menu (name,description,img_url,price,calorie,category_id) values (
    '숯불직화구이 덮밥',
    '석쇠에 구워 숯불향이 가득한 직화구이 덮밥, 라유소스로 매콤한 풍미까지!',
    'jikhwagui.jpeg',
    '5900',
    '621.35',
    2
);
insert into menu (name,description,img_url,price,calorie,category_id) values ('마파두부 덮밥',
    '식물성 단백질 고기를 넣어 단백질 up! 중화식두반장의 매콤함을 살린 마파두부덮밥','mafa.jpeg','5000','504.35',2);
insert into menu (name,description,img_url,price,calorie,category_id) values ('왕카레돈까스덮밥',
    '곱빼기 밥(300g)에 카레와 돈까스덮밥을 합친 메뉴입니다.','bigcurrydon.jpeg','5900','1454.05',2);
insert into menu (name,description,img_url,price,calorie,category_id) values ('돈까스도련님고기고기',
    '돈까스와 떡햄버그, 치킨으로 구성된 도련님 도시락','bigcurrydon.jpeg','6000','872.73',5);
insert into menu (name,description,img_url,price,calorie,category_id) values ('탕수육도련님고기고기',
    '돈까스와 바삭한 찹쌀탕수육으로 구성된 도련님 도시락에 제육볶음과 소불고기','tangsu.jpeg','5800','721.73',5);
insert into menu (name,description,img_url,price,calorie,category_id) values ('제육 김치찌개 정식',
    '따끈한 집밥이 연상되는 한상차림의 정식메뉴 제육볶음과 묵은지 김치찌개','jeyukkimchi.jpeg','8200','1037.72',7);
insert into menu (name,description,img_url,price,calorie,category_id) values ('트리플 치즈 파스타',
    '소고기와 돼지고기가 푸짐하게 들어가 씹히는 맛이 일품','tripleCheesePasta.jpeg','5500','684.95', 15);
insert into menu (name,description,img_url,price,calorie,category_id) values ('튼튼 도시락',
    '아이들이 좋아하는 새우튀김, 돈까스, 후리카케 등 맛에서 건강까지','tonton.jpeg','5000','458.3',14);

insert into menu (name,description,img_url,price,calorie,category_id) values (
    '매화(순살 고등어 간장구이)',
    '12가지 다양한 반찬으로 구성된 프리미엄 도시락',
    'mahwa.jpeg',
    '10000',
    '753.942',
    4
);
select * from menu;
alter table menu modify price int;


select * from `option`;

insert into `option`(option_name, price) values('한솥밥 곱빼기',400);
insert into `option`(option_name, price) values('현미밥 교체',1000);
insert into `option`(option_name, price) values('계란후라이',1000);
insert into `option`(option_name, price) values('청양고추',300);
insert into `option`(option_name, price) values('3종믹스치즈',1500);
select * from `option`;