const http = require('http');
const cheerio = require('cheerio');
const url = 'http://www.imooc.com/learn/348';

function filterChapters(html) {
    const $ = cheerio.load(html);

    // [{
    //     chapterTitle: '',
    //     videos: [
    //         title: '',
    //         id: ''
    //     ]
    // }]

    const chapters = $('.chapter');

    let courseData = [];

    chapters.each(function(item) {
        const chapter = $(this);
        const chapterTitle = chapter.find('strong').text();

        const videos = chapter.find('.video').children('li');

        let chapterDate = {
            chapterTitle: chapterTitle,
            videos: []
        }

        videos.each(function(item) {
            const video = $(this).find('.J-media-item');
            const videoTitle = video.text();
            const id = video.attr('href').split('video/')[1];

            chapterDate.videos.push({
                title: videoTitle,
                id: id
            })
        })

        courseData.push(chapterDate);
    });

    return courseData;
}

function printCourseData(courseData) {
    courseData.forEach(function(item) {
        const chapterTitle = item.chapterTitle;

        console.log(chapterTitle + '\n');

        item.videos.forEach(function(video) {
            console.log(' 【' + video.id + '】 ' + video.title + '\n');
        })
    });
}

http.get(url, function(res) {
    let html = '';

    res.on('data', function(data) {
        html += data;
    })

    res.on('end', function() {
        const courseData = filterChapters(html);

        printCourseData(courseData);
    })
}).on('error', function() {
    console.log('获取出错');
})