drop database if exists hansot;
create database if not exists hansot default character set utf8 collate utf8mb3_general_ci;

use hansot;

create table user_info(
    id int not null auto_increment,
    uid varchar(20) not null,
    pwd varchar(20) not null,
    email varchar(45) not null,
    name varchar(20) not null,
    date datetime,
    constraint user_info_PK primary key (id)
);
drop table category;
create table category(
    category_id int not null auto_increment primary key ,
    title varchar(45) not null,
    level int not null,
    parent int not null,
    url varchar(45)
);


select * from category;


create table menu(
    menu_id int not null auto_increment primary key ,
    name varchar(45) not null,
    description varchar(450),
    img_url varchar(45),
    price int,
    calorie varchar(45),
    category_id int,
    foreign key (category_id) references category(category_id) on update cascade
);


create table `order`(
    order_id int not null auto_increment primary key ,
    member_id int,
    menu_id int,
    foreign key (member_id) references user_info(id) on update cascade,
    foreign key (menu_id) references menu(menu_id) on update cascade
);

select * from `order`;

select last_insert_id() as id;
create table `option` (
    option_id int not null auto_increment primary key ,
    option_name varchar(45) not null,
    price varchar(45) not null
);



create table order_option (
    order_option_id int not null auto_increment primary key ,
    order_id int not null,
    option_id int not null,
    foreign key (order_id) references `order`(order_id) on update cascade ,
    foreign key (option_id) references `option`(option_id) on update cascade
);

select * from `order`;

select * from order_option;
select * from `order`;

select * from order_option;

select * from menu;
select user_info.uid, o.price, o.order_id, m.name from user_info inner join `order` o on user_info.id = o.member_id inner join menu m on o.menu_id = m.menu_id where user_info.uid='test';

select option_name from order_option inner join `option` on order_option.option_id = `option`.option_id where order_option.order_id=1;


create table menu_option (
    menu_option_id int not null auto_increment primary key ,
    menu_menu_id int not null,
    option_id int not null,
    foreign key (menu_menu_id) references menu(menu_id) on update cascade ,
    foreign key (option_id) references `option`(option_id) on update cascade
);

create table franchisee(
    franchisee_id int not null auto_increment primary key ,
    name varchar(45) not null,
    district varchar(45) not null,
    city varchar(45) not null,
    keyword varchar(45),
    address_more varchar(45),
    full_address varchar(45),
    detail varchar(45),
    latitude varchar(45),
    longitude varchar(45)
);

show tables;

desc category;
desc franchisee;
desc menu;
desc menu_option;
desc `option`;
desc `order`;
desc order_option;
desc user_info;

