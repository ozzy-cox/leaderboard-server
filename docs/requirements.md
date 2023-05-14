# Back end
## Technical
1. NodeJS, TS
1. Stateless ? REST ?
1. Redis for leaderboard logic (sortedset)
1. Relational DB for player profile 
1. There should be only one function to return the leaderboard for top rankings data.

## Functional
1. 10.000.000 active players, high traffic.
1. Leaderboard will be sorted.
1. 2% of all the money will be collected in the prize pool.
1. Will reset each week, when reset, calculate top 100 players to reward with in game money.
1. Collected money will be distributed like so:
   1. player will get 20%
   1. player will get 15% 
   1. player will get 10% 
   1. Remaining will be given to the **other** players in the top 100.
      1. Maybe in inverse ratio of their ordering in the leaderboard ??
1. The top ranking data is as follows: (rel: Technical.6)
    1. First 100 players, the player searched, 3 players above and two players below the searched player.
1. After distribution, 

