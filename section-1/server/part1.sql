CREATE TABLE cohorts (
	cohort_id SERIAL PRIMARY KEY, 
	city VARCHAR(30), 
	startDate DATE, 
	endDate DATE
	)
;

INSERT INTO cohorts (
	city, 
	startDate, 
	endDate
	)
;

VALUES (
	'San Francisco',
	'2019-01-07', 
	'2019-06-21'
	)
;

INSERT INTO cohorts (
	city, 
	startDate, 
	endDate
	) 
VALUES ('San Francisco', 
	'2019-07-08', 
	'2019-12-20'
	)
;

CREATE TABLE apprentices (
	apprentice_id SERIAL PRIMARY KEY, 
	first VARCHAR(30), 
	last VARCHAR(30), 
	cohort_id INT references cohorts(cohort_id)
	)
;

INSERT INTO apprentices (
	first, 
	last, 
	cohort_id
	) 
VALUES (
	'Karolina', 
	'Benitez', 
	'1'
	)
;

INSERT INTO apprentices (
	first, 
	last, 
	cohort_id
	) 
VALUES (
	'Chisom', 
	'Jika', 
	'1'
	)
;

INSERT INTO apprentices (
	first, 
	last, 
	cohort_id
	) 
VALUES (
	'Isabelle', 
	'Yiu', 
	'1'
	)
;

INSERT INTO apprentices (
	first, 
	last, 
	cohort_id
	) 
VALUES (
	'Megan', 
	'Mackey', 
	'2'
	)
;

INSERT INTO apprentices (
	first, 
	last, 
	cohort_id
	) 
VALUES (
	'Kelly', 
	'Sousa', 
	'1'
	)
;
