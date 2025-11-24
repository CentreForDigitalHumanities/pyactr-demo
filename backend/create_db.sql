create user pyactr_demo with createdb password 'pyactr_demo';
create database pyactr_demo;
grant all on database pyactr_demo to pyactr_demo;
GRANT ALL ON SCHEMA public to pyactr_demo;

ALTER DATABASE pyactr_demo OWNER TO pyactr_demo;
