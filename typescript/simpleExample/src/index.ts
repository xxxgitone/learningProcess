import { GithubApiService } from './githubApiService'
import { User } from './User'
import * as _ from 'lodash'
import { Repo } from './Repo';

let svc = new GithubApiService()
svc.getUserInfo('xxxgitone')
  .then((user: any) => {
    svc.getRepos('xxxgitone')
      .then((repos: any) => {
        let sortedRepos = _.sortBy(repos, [(repo: Repo) => repo.forkCount])
        user.repos = sortedRepos
        console.log(user)
      })
  })

