#!/bin/bash

time_length=0.25s

for i in `seq 1 5`;
do
	timeout $time_length speaker-test -f500 -t sine;
done