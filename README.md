# Tubes Stima 3 by -Tania
> DNA pattern matching web-based application written in Golang. Based on the concept of Knuth-Morris-Pratt (KMP) and Boyer-Moore (BM) algorithm.


## Table of Contents
* [Introduction](#introduction)
* [General Information](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Overview](#overview)
* [Setup](#setup)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Library](#library)
* [Contact](#contact)


## Introduction
Hello, everyone! Welcome to our GitHub Repository!

This project was created by:
| No. | Name | Student ID |
| :---: | :---: | :---: |
| 1. | Grace Claudia | 13520078 |
| 2. | Patrick Amadeus | 13520109 |
| 3. | Nelsen Putra | 13520130 |


## General Information
![DNASequence](https://miro.medium.com/max/700/1*MvF9NUzn54va1_TO8RMLoA.png)

Humans generally have 46 chromosomes in each cell. These chromosomes are composed of DNA (deoxyribonucleic acid) or deoxyribonucleic acid. DNA is composed of two purine bases, namely adenine (A) and guanine (G), and two pyrimidine bases, namely cytosine (C) and thymine (T). Each purine will bind to a pyrimidine. DNA is the genetic material that determines a person's traits and characteristics, such as skin color, eyes, hair, and face shape. When a person has a genetic or DNA disorder, for example due to a hereditary disease or due to other factors, he or she can experience certain diseases. Therefore, DNA testing is important to do to find out the genetic structure in a person's body and detect genetic disorders. There are various types of DNA tests that can be performed, such as pre-implantation testing, prenatal testing, carrier testing, forensic testing, and DNA sequence analysis.

One type of DNA test that is closely related to the world of bioinformatics is DNA sequence analysis. DNA sequence analysis is a method that can be used to predict various diseases stored in a database based on the sequence of their DNA sequences. A DNA sequence is a representation of the string of nucleotides stored in a DNA chain, for example: ATTCGTAACTAGTAAGTTA. Pattern matching technique plays an important role in being able to analyze very long DNA sequences in a short time. Therefore, Informatics Engineering students intend to create a web application in the form of DNA Sequence Matching that applies String Matching and Regular Expression algorithms to assist health service providers in predicting patient diseases. Prediction results can also be displayed in a table and equipped with a search column to assist admins in filtering and searching.

Therefore, we are asked to build a DNA Pattern Matching application. By utilizing the String Matching and Regular Expression algorithms that we have learned in the IF2211 Strategy Algorithm class, we are expected to be able to build an interactive application to detect whether a patient has a certain genetic disease. The prediction results can be stored in the database for later display based on search queries.


## Technologies Used
The program was written in Golang, JavaScript, HTML, CSS using React framework and MongoDB for the database tool.


## Features
- [x] Receive new disease input in the form of disease name and its DNA sequence
- [x] Predict someone suffering from a certain genetic disease based on DNA sequence
- [x] Display a sequence of predictive test results with a search field in it that acts as a filter in displaying the results
- [x] Save new disease entries and DNA prediction test results into a database connected to the application
- [x] **(Bonus)** Display and calculate the level of similarity between the user's DNA and the DNA of the disease on a DNA test


## Overview
![Overview](https://user-images.githubusercontent.com/88304550/165973319-ccd5fbf9-8446-478b-8a49-f24928c24c80.png)


## Setup
### Installation
- Install the whole modules and [libraries](#library) used in the source code
- Download the whole folders and files in this repository or do clone the repository

### Compilation 
1. Clone this repository in your own local directory

    `git clone https://github.com/graceclaudia19/Tubes3_13520078_stima.git`

2. Open the command line and change the directory to 'frontend' folder

    `cd Tubes3_13520078_stima/src/frontend`
    
3. Run `npm install` on the command line
4. Run `npm run start` on the command line


## Project Status
Project is: _complete_

All the specifications were implemented, including bonus.


## Room for Improvement
- A faster or more efficient algorithm to make the program run quicker
- A better UI/UX to satisfy the users of this application


## Acknowledgements
- This project was based on [Spesifikasi Tugas Besar 3 Stima](http://informatika.stei.itb.ac.id/~rinaldi.munir/Stmik/2021-2022/Tugas-Besar-3-IF2211-Strategi-Algoritma-2022.pdf)
- Thanks to God
- Thanks to Mrs. Masayu Leylia Khodra, Mrs. Nur Ulfa Maulidevi, and Mr. Rinaldi as our lecturers
- Thanks to academic assistants
- This project was created to fulfill our Big Project for IF2211 Algorithm Strategies

## Library
* [React](https://reactjs.org/)
* [Bootstrap](https://getbootstrap.com/)
* [Axios](https://axios-http.com/docs/intro)

## Contact
Created by -Tania. 2022 All Rights Reserved.
