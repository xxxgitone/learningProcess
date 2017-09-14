function ArrayList () {
    var array = []

    this.insert = function (item) {
        array.push(item)
    }

    this.toString = function () {
        return array.join()
    }

    // 冒泡排序：最简单，但是性能最差
    // 原理：比较任何两个相邻的项，如果第一个比第二个大，则交换它们
    // 元素向上移动至正确的顺序

    var swap = function (index1, index2) {
        var aux = array[index1]
        array[index1] = array[index2]
        array[index2] = aux
    }

    this.bubbleSort = function () {
        for (var i = 0; i < array.length; i++) { // 外循环控制了经过多少轮排序
            for (var j = 0; j < array.length - 1; j++) {
                if (array[j] > array[j + 1]) {
                    swap(j, j + 1)
                }
            }
        }
    }

    // 改进的冒泡排序，前一轮已经确定的排序没有必要在比较一次
    // 时间复杂度O(n^2)
    this.modifiedBubbleSort = function () {
        for (var i = 0; i < array.length; i++) { // 外循环控制了经过多少轮排序
            for (var j = 0; j < array.length - 1 - i; j++) { // 在内循环中减去已经排过的轮数
                if (array[j] > array[j + 1]) {
                    swap(j, j + 1)
                }
            }
        }
    }

    // 选择排序算法是一种原址比较排序算法，
    // 选择排序大致的思路就是找到数据结构中最小值并将其放在第一位，接着找到第二小的值并将其放在第二位，以此类推
    // 时间复杂度O(n^2)
    this.selectionSort = function () {
        var indexMin
        for (var i = 0; i < array.length - 1; i++) {
            indexMin = i;
            for (var j = i + 1; j < array.length; j++) {
                if (array[indexMin] > array[j]) {
                    indexMin = j
                }
            }
            swap(i, indexMin)
        }
    }

    // 插入排序每次排一个数组项，以此方式构建最后的排序数组
    // 假定第一项已经排序好了，接着，第二项和它进行比较，如果第二项大于它则不动，小于则把第二项放到第一项的位置
    // 接着将第三项和前两项进行比较，以此类推
    this.insertionSort = function () {
        var j, temp
        for (var i = 1; i < array.length; i++) {
            j = i
            temp = array[i]
            while (j > 0 && array[j - 1] > temp) {
                array[j] = array[j - 1]
                j--
            }
            array[j] = temp
        }
    }

    // 归并排序
    // 归并排序是一种分治算法
    // 其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，最后只有一个排序完毕的大数组
    // 由于是分治法，归并排序也是递归的

    var merge = function (left, right) {
        var result = [],
            il = 0,
            ir = 0

        while (il < left.length && ir < right.length) {
            if (left[il] < right[ir]) {
                result.push(left[il++])
            } else {
                result.push(right[ir++])
            }
        }

        while (il < left.length) {
            result.push(left[il++])
        }

        while (ir < right.length) {
            result.push(right[ir++])
        }

        return result
    }

    function mergeSortRec (array) {
        var length = array.length
        if (length === 1) {
            return array
        }

        var mid = Math.floor(length, 2)
            left = array.slice(0, mid)
            right = array.slice(mid, length)
        
        return merge(mergeSortRec(left), mergeSortRec(right))
    }

    this.mergeSort = function () {
        array = mergeSortRec(array)
    }

    this.quickSort = function () {
        quick(array, 0, array.length -1)
    }
    /**
     * 快速排序思想
     * 1） 从数组中选择中间一项作为主元
     * 2） 创建两个指针，左边一个指向数组第一项，右边一个指向数组最后一项。移动左指针直到找到一个比主元大的元素，接着，移动       右指针直到找到一个比主元小的元素，然后交换他们，重复这个过程，直到左指针超过了右指针。这个过程将使得比主元小的值
     *      都在主元之前，大的都在主元之后。这个过程叫做划分操作
     * 3） 接着，算法对划分操作后的小数组（较主元小的值组成的子数组，以及较主元大的值组成的子数组）重复之前的两个步骤，直到      数组已完全排序
     * @param {待排序数组} array 
     * @param {左边划分} left 
     * @param {右边划分} right 
     */
    function quick (array, left, right) {
        var index

        if (array.length > 1) {
            index = partition(array, left, right)

            if (left < index -1) {
                quick(array, left, index -1)
            } 

            if (index < right) {
                quick(array, index, right)
            }
        }
    }

    function partition (array, left, right) {
        var pivot = array[Math.floor((right + left) / 2)],
            i = left,
            j = right
        
        while (i <= j) {
            while (array[i] < pivot) {
                i++
            }
            while (array[j] > pivot) {
                j--
            }
            if (i <= j) {
                swapQuickStort(array, i, j)
                i++
                j--
            }
        }
        return i
    }

    function swapQuickStort (array, index1, index2) {
        var aux = array[index1]
        array[index1] = array[index2]
        array[index2] = aux
    }
}

function createNonSortedArray (size) {
    var array = new ArrayList()
    for (var i = size; i > 0; i--) {
        array.insert(i)
    }
    return array
}
// 冒泡
// var array = createNonSortedArray(5)
// console.log(array.toString()) // 5,4,3,2,1
// array.bubbleSort()
// console.log(array.toString()) // 1,2,3,4,5

// 选择
// var array = createNonSortedArray(5)
// console.log(array.toString()) // 5,4,3,2,1
// array.selectionSort()
// console.log(array.toString()) // 1,2,3,4,5

// 插入
// var array = createNonSortedArray(5)
// console.log(array.toString()) // 5,4,3,2,1
// array.insertionSort()
// console.log(array.toString()) // 1,2,3,4,5

// 快速
var array = createNonSortedArray(5)
console.log(array.toString()) // 5,4,3,2,1
array.quickSort()
console.log(array.toString()) // 1,2,3,4,5


