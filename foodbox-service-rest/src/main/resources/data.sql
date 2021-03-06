insert into menu(id,name,description,category,imgurl,price,active) values (1,'Sweet & Sour Soup','A description of Sweet & Sour Soup.','chinese','assets/img/chinese/chinese_sweetsoursoup.jpeg',7.99,true);
insert into menu(id,name,description,category,imgurl,price,active) values (2,'Dumplings','A description of Dumplings.','chinese','assets/img/chinese/chinese_dumpling.jpeg',14.99,true);
insert into menu(id,name,description,category,imgurl,price,active) values (3,'Eggrolls','A description of Eggrolls.','chinese','assets/img/chinese/chinese_eggroll.jpeg',12.99,true);
insert into menu(id,name,description,category,imgurl,price,active) values (4,'Lo Mein','A description of Lo Mein.','chinese','assets/img/chinese/chinese_lomein.jpeg',10.49,true);
insert into menu(id,name,description,category,imgurl,price,active) values (5,'Spicy Brocoli','A description of Spicy Brocoli.','chinese','assets/img/chinese/chinese_spicybrocoli.jpeg',14.49,true);
insert into menu(id,name,description,category,imgurl,price,active) values (6,'Beef Brocoli','A description of Beef Brocoli.','chinese','assets/img/chinese/chinese_beefbrocoli.jpeg',11.19,true);

insert into menu(id,name,description,category,imgurl,price,active) values (7,'Biryani','A description of Biryani.','indian','assets/img/indian/indian_biryani.jpeg',14.49,true);
insert into menu(id,name,description,category,imgurl,price,active) values (8,'Dosa','A description of Dosa.','indian','assets/img/indian/indian_dosa.jpeg',12.49,true);
insert into menu(id,name,description,category,imgurl,price,active) values (9,'Indian Entree 1','A description of Entree 1.','indian','assets/img/indian/indian_entree1.jpeg',12.99,true);
insert into menu(id,name,description,category,imgurl,price,active) values (10,'Indian Entree 2','A description of Entree 2.','indian','assets/img/indian/indian_entree2.jpeg',11.79,true);
insert into menu(id,name,description,category,imgurl,price,active) values (11,'Indian Entree 3','A description of Entree 3.','indian','assets/img/indian/indian_entree3.jpeg',12.89,true);
insert into menu(id,name,description,category,imgurl,price,active) values (12,'Indian Entree 4','A description of Entree 4.','indian','assets/img/indian/indian_entree4.jpeg',17.69,true);
insert into menu(id,name,description,category,imgurl,price,active) values (13,'Thali','A description of Thali.','indian','assets/img/indian/indian_thali.png',14.69,true);

insert into menu(id,name,description,category,imgurl,price,active) values (14,'Chimichanga','A description of Chimichanga.','mexican','assets/img/mexican/mexican_chimichanga.jpeg',14.49,true);
insert into menu(id,name,description,category,imgurl,price,active) values (15,'Fajitas','A description of Fajitas.','mexican','assets/img/mexican/mexican_fajitas.jpeg',12.49,true);
insert into menu(id,name,description,category,imgurl,price,active) values (16,'Quesadilla Entree','A description of Quesadilla Entree.','mexican','assets/img/mexican/mexican_quesadilla.jpeg',12.99,true);
insert into menu(id,name,description,category,imgurl,price,active) values (17,'Tacos','A description of Tacos.','mexican','assets/img/mexican/mexican_tacos.jpeg',11.79,true);
insert into menu(id,name,description,category,imgurl,price,active) values (18,'Tamale','A description of Tamale.','mexican','assets/img/mexican/mexican_tamale.jpeg',12.89,true);
insert into menu(id,name,description,category,imgurl,price,active) values (19,'Discontinued Tamale','A description of Tamale.','mexican','assets/img/mexican/mexican_tamale.jpeg',12.89,false);

insert into user(id,name,address,username,password,adminstatus) values (1,'Sam Parsons','123 Address, Washington, DC, 20010','sam','pw',true);
insert into user(id,name,address,username,password,adminstatus) values (2,'Georgi Candia','123 Street, Washington, DC, 20010','georgi','pw',true);
insert into user(id,name,address,username,password,adminstatus) values (3,'Puck Parsons','123 Road, Washington, DC, 20010','puck','pw',false);
insert into user(id,name,address,username,password,adminstatus) values (4,'Ben Parsons','123 Road, Washington, DC, 20010','ben','pw',false);
insert into user(id,name,address,username,password,adminstatus) values (5,'Marabai Beczkiewicz','123 Road, Bloomington, IN, 47408','merbs','pw',false);
insert into user(id,name,address,username,password,adminstatus) values (6,'Milo Beczkiewicz','123 Road, Bloomington, DC, 20010','milo','pw',false);
insert into user(id,name,address,username,password,adminstatus) values (7,'Annika Beczkiewicz','123 Road, Bloomington, DC, 20010','anni','pw',false);
insert into user(id,name,address,username,password,adminstatus) values (8,'Jana Parsons','123 Road, La Crosse, DC, 20010','jana','pw',false);
insert into user(id,name,address,username,password,adminstatus) values (9,'Logan Parsons','123 Road, La Crosse, DC, 20010','logie','pw',false);
insert into user(id,name,address,username,password,adminstatus) values (10,'Emilee Parsons','123 Road, Bloomington, DC, 20010','emi','pw',false);
insert into user(id,name,address,username,password,adminstatus) values (11,'Sharon Parsons','123 Road, Bloomington, DC, 20010','emi','pw',false);
insert into user(id,name,address,username,password,adminstatus) values (12,'Aurora Alvarez','123 Calle, Buenos Aries, BS, 20010','suegra','pw',false);
insert into user(id,name,address,username,password,adminstatus) values (13,'Diego Candia','123 Calle, Viedma, RN, 20010','suegro','pw',false);
insert into user(id,name,address,username,password,adminstatus) values (14,'Jorge Alvarez','123 Calle, Buenos Aries, BS, 20010','tio','pw',false);

insert into transaction_total(id,userid,totalprice,paymentmethod,transactiondate,deliverydate,deliverytime) values (1,1,24.98,'Visa','01-01-2022','01-01-2022','13:00');
insert into transaction_detail(id,transactionid,userid,menuid,quantity) values (1,1,1,15,2);

insert into transaction_total(id,userid,totalprice,paymentmethod,transactiondate,deliverydate,deliverytime) values (2,1,27.38,'Visa','01-05-2022','01-06-2022','01:24');
insert into transaction_detail(id,transactionid,userid,menuid,quantity) values (2,2,1,7,1);
insert into transaction_detail(id,transactionid,userid,menuid,quantity) values (3,2,1,18,1);

insert into transaction_total(id,userid,totalprice,paymentmethod,transactiondate,deliverydate,deliverytime) values (3,2,38.77,'Amex','04-01-2021','04-01-2021','11:52');
insert into transaction_detail(id,transactionid,userid,menuid,quantity) values (4,3,2,14,1);
insert into transaction_detail(id,transactionid,userid,menuid,quantity) values (5,3,2,17,1);
insert into transaction_detail(id,transactionid,userid,menuid,quantity) values (6,3,2,8,1);
