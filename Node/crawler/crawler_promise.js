const http = require('http');
const Promise = require('bluebird');
const cheerio = require('cheerio');
const baseUrl = 'http://www.imooc.com/learn/';
const url = 'http://www.imooc.com/learn/348';
let videoIds = [348, 259, 197, 134, 75];

function filterChapters(html) {
    const $ = cheerio.load(html);
    const chapters = $('.chapter');
    const title = $('.course-infos .path span').text();
    const number = parseInt($($('.static-item')[1]).find('.js-learn-num').text().trim(), 10);

    // courseData = {
    //     title: title,
    //     number: number,
    //     videos: [{
    //     chapterTitle: '',
    //     videos: [
    //             title: '',
    //             id: ''
    //         ]
    //     }]
    // }


    let courseData = {
        title: title,
        number: number,
        videos: []
    };

    chapters.each(function(item) {
        const chapter = $(this);
        const chapterTitle = chapter.find('strong').text();

        let videos = chapter.find('.video').children('li');

        let chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        }

        videos.each(function(item) {
            const video = $(this).find('.J-media-item');
            const videoTitle = video.text();
            const id = video.attr('href').split('video/')[1];

            chapterData.videos.push({
                title: videoTitle,
                id: id
            })
        })

        courseData.videos.push(chapterData);
    });

    return courseData;
}

function printCoursesData(coursesData) {
    coursesData.forEach(function(courseData) {
        console.log(courseData.number + ' 人学过 ' + courseData.title + '\n');
    })

    coursesData.forEach(function(courseData) {
        console.log('### ' + courseData.title + '\n');
        
        courseData.videos.forEach(function(item) {
            const chapterTitle = item.chapterTitle;

            console.log(chapterTitle + '\n');

            item.videos.forEach(function(video) {
                console.log(' 【' + video.id + '】 ' + video.title + '\n');
            })
        })
    });
}

function getPageAsync(url) {
    return new Promise(function(resolve, reject) {
        console.log('正在爬取');

        http.get(url, function(res) {
            let html = '';

            res.on('data', function(data) {
                html += data;
            })

            res.on('end', function() {
                resolve(html);

                //const courseData = filterChapters(html);

                // printCourseData(courseData);
            })
        }).on('error', function(e) {
            reject(e)
            console.log('获取出错');
        })

    })
}



let fetchCourseArray = [];

videoIds.forEach(function(id) {
    fetchCourseArray.push(getPageAsync(baseUrl + id));
})


Promise.all(fetchCourseArray)
    .then(function(pages) {
        let coursesData = [];
        
        pages.forEach(function(html) {
            let courses = filterChapters(html);

            coursesData.push(courses);
        })

        coursesData.sort(function(a, b) {
            return a.number < b.number;
        })

        printCoursesData(coursesData);
    })