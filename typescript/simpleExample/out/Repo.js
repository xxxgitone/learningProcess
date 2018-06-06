"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Repo = /** @class */ (function () {
    function Repo(repo) {
        this.name = repo.name;
        this.description = repo.description;
        this.url = repo.url;
        this.size = repo.size;
        this.forkCount = repo.forks_count;
    }
    return Repo;
}());
exports.Repo = Repo;
