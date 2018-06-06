import axios, { AxiosResponse, AxiosError } from 'axios'
import { User } from './User'
import { Repo } from './Repo'

export class GithubApiService {
  getUserInfo (userName: string) {
    return axios.get(`https://api.github.com/users/${userName}`)
      .then((res: AxiosResponse) => {
        let data = res.data
        let user = new User(data)
        return user
      })
      .catch((e: AxiosError) => {
        console.log(e)
      })
  }

  getRepos (userName: string) {
    return axios.get(`https://api.github.com/users/${userName}/repos`)
      .then((res: AxiosResponse) => {
        let reposArray = res.data
        return reposArray.map((repo: any) => new Repo(repo))
      })
      .catch((e: AxiosError) => {
        console.log(e)
      })
  }
}