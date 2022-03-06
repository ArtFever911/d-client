## How to start
Lets clone the repo and run 
`npm install`

Go to repo folder in your local machine and use command to start attack
```
npm start --cluster 1 --host "https://example.com/" --amount 1
```
Where:<br>
 `--clusters` means how much threads you are going to create. Use up to 500 on machine with 16 GB RAM an 8 CPU.<br>
`--host` it is the target which you are going to attack. <br>
`--amount` it is the request that you are going to perform by on thread.