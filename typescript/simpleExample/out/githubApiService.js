"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var User_1 = require("./User");
var Repo_1 = require("./Repo");
var GithubApiService = /** @class */ (function () {
    function GithubApiService() {
    }
    GithubApiService.prototype.getUserInfo = function (userName) {
        return axios_1.default.get("https://api.github.com/users/" + userName)
            .then(function (res) {
            var data = res.data;
            var user = new User_1.User(data);
            return user;
        })
            .catch(function (e) {
            console.log(e);
        });
    };
    GithubApiService.prototype.getRepos = function (userName) {
        return axios_1.default.get("https://api.github.com/users/" + userName + "/repos")
            .then(function (res) {
            var reposArray = res.data;
            return reposArray.map(function (repo) { return new Repo_1.Repo(repo); });
        })
            .catch(function (e) {
            console.log(e);
        });
    };
    return GithubApiService;
}());
exports.GithubApiService = GithubApiService;
