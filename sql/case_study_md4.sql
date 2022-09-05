drop database case_study_md4_drap;
create database case_study_md4_drap;
use case_study_md4_drap;

create table users(
id bigint auto_increment primary key,
userName varchar(20) unique,
pass varchar(50) not null,
fullName varchar(50),
phone varchar(20),
email varchar(50),
bith date,
adress varchar(100),
avatar varchar(100),
hobby varchar(500),
blockStatus int
);

create table friendList(
id bigint auto_increment primary key,
statusRequestTo varchar(20),
statusRequestFrom varchar(20),
idUserTo bigint,
foreign key (idUserTo) references userTable (id),
idUserFrom bigint,
foreign key (idUserFrom) references userTable (id)
);

create table posts(
id bigint auto_increment primary key,
content varchar(1000),
image varchar(100),
likeCount bigint,
permissionPost varchar(20),
deletePost int,
idUser bigint,
foreign key (idUser) references userTable (id)
);

create table comments(
id bigint auto_increment primary key,
content varchar(1000),
likeCount bigint,
idPost bigint,
deleteComment int,
foreign key (idPost) references postTable (id),
idUser bigint,
foreign key (idUser) references userTable (id)
);

create table notification(
id bigint auto_increment primary key,
content varchar(1000),
idUserTo bigint,
deleteNotification int,
foreign key (idUserTo) references userTable (id),
idUserFrom bigint,
foreign key (idUserFrom) references userTable (id)
);

create table likePost(
id bigint auto_increment primary key,
idUser bigint,
foreign key (idUser) references userTable (id),
idPost bigint,
foreign key (idPost) references postTable (id)
);

create table likeComment(
id bigint auto_increment primary key,
idUser bigint,
foreign key (idUser) references userTable (id),
idCmt bigint,
foreign key (idCmt) references commentTable (id)
);
