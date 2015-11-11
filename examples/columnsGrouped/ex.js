/* global angular *///ignore
(function () {//ignore
    var name = 'columnsGrouped';

    function getName(len) {
        var alpha = 'abcdefghijklmnopqrstuvwxyz', str = '';
        while (str.length < len) {
            str += alpha[Math.floor(Math.random() * alpha.length)];
        }
        return str;
    }

    angular.module(name, ['ux'])
        .controller('tabs', function ($scope) {//ignore
            $scope.tab = 'html';//ignore
        })//ignore
        .controller('ctrl', function ($scope) {
            // we are going to create some grouped data. Array of items with .children arrays of items.
            // top level items become the group headers, the children items become the rows.
            var i = 0, j, len = 10, items = [], item, childLen = 0;
            while (i < len) {
                item = {id: i, children: []};
                items.push(item);
                childLen = Math.random() * 10;
                j = 0;
                while (j < childLen) {
                    item.children.push({
                        id: i + '.' + j,
                        firstName: getName(10),
                        lastName: getName(10),
                        age: Math.floor(Math.random() * 50 + 18),
                        kids: Math.floor(Math.random() * 10)
                    });
                    j += 1;
                }
                i += 1;
            }
            $scope.items = items;
        });
    angular.module('ux').factory('whichTemplate', function () {

        return ['inst', function (inst) {
            // now we override it with our method so we decide what template gets displayed for each row.
            inst.templateModel.getTemplate = function (item) {
                // item would be the item in your array of data provided to the datagrid.
                // let's make our default option be 'row'. Otherwise datagrid defaults this to 'default'.
                var name = item.children ? 'group' : 'row';
                // now we get the template from the name.
                return inst.templateModel.getTemplateByName(name);
            };
        }];
    });
    var el = document.querySelector("*[ng-app='" + name + "']"), strapped = false;//ignore
    window.addEventListener('scroll', function () {//ignore
        if (!strapped && hb.isElementInViewport(el)) {//ignore
            strapped = true;
            angular.bootstrap(el, [name]);//ignore
        }//ignore
    });//ignore
}());//ignore
