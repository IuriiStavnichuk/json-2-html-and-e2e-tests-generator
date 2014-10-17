Table + AngularJS
=================
This directive allow to liven your tables. It support sorting, filtering and pagination.
Header row with titles and filters automatic generated on compilation step.

## Installing via Bower
```
bower install https://github.com/esvit/ng-table.git
```

## Examples (from simple to complex)

* [Pagination](http://esvit.github.io/ng-table/#!/demo1)
* [Sorting](http://esvit.github.io/ng-table/#!/demo3)
* [Filtering](http://esvit.github.io/ng-table/#!/demo4)
* [Params in url](http://esvit.github.io/ng-table/#!/demo5)
* [Ajax](http://esvit.github.io/ng-table/#!/demo6)
* [Custom template(pagination)](http://esvit.github.io/ng-table/#!/demo2)

## Usage
```html
<table ng-table="tableParams" show-filter="true">
<tr ng-repeat="user in users">
    <td title="Name" filter="{ 'name': 'text' }" sortable="name">
        {[user.name]}
    </td>
    <td title="Age" filter="{ 'action': 'button' }" sortable="age">
        {[user.age]}
    </td>
</tr>
</table>
```