var wxcharts = require('../../wxcharts/wxcharts.js');//读取wxchart.js资源，并赋值给wxcharts变量
var app = getApp();
Page({

    data: {//设置检测点信息变量
        obsSensor: {},
        selobsSensor: {}
    },
    widgetsToggle: function (e) {//点击不同类型传感器显示数据
        var id = e.currentTarget.id, obsSensor = this.data.obsSensor,obsid=app.globalData.obsid;
        //点击一个展开数据，其他传感器数据关闭
        for (var i = 0, len = obsSensor.obsSensorTypes.length; i < len; ++i) {
            if (obsSensor.obsSensorTypes[i].sensortypeid == id) {
                obsSensor.obsSensorTypes[i].open = !obsSensor.obsSensorTypes[i].open;
            } else {
                obsSensor.obsSensorTypes[i].open = false;
            }
        };
        var that = this;
        wx.request({//点开之后向服务器请求数据，包括近5天数据和近5条数据
            url: 'https://dzjc.cjlu.edu.cn/wx/selSensor?obsid=' + obsid + '&senTypeId=' + id,
            data: {},
            method: 'GET', // 设置请求的方法
            // header: {}, // 设置请求的 header
            success: function (res) {
                // 请求成功回调函数
                that.setData({//设置检测点信息变量
                    selobsSensor: res.data
                }),
                 new wxcharts({//实例化获取的wxcharts.js资源，并获取wxchart对象
                    canvasId: 'linecanvas'+id,//获取前台的canvasid
                    type: 'line',//绘图方式选择折线图
                    categories: res.data.selObsSensorType.wxCharts5.categories,
                    //返回的近五条数据情况,
                    series: [{
                        name: '近5条数据',
                        data: res.data.selObsSensorType.wxCharts5.series[0].data,
                        format: function (val) {
                            return val.toFixed(1);//保留一位小数
                        }
                    }],
                    yAxis: {
                        title: res.data.selObsSensorType.wxCharts5.series[0].name,//y轴标题
                        format: function (val) {
                            return val.toFixed(1);//保留一位小数
                        },
                        max:res.data.selObsSensorType.wxCharts5.series[0].data[0]/20*21,//y轴最大值为数据最大值多1/20
                        min: res.data.selObsSensorType.wxCharts5.series[0].data[0]/20*19//y轴最小值为数据最大值少1/20
                    },
                    width: 320,//canvas画布的大小
                    height: 200
                });
                 new wxcharts({//实例化获取的wxcharts.js资源，并获取wxchart对象
                    canvasId: 'linecanvas5days'+id,//获取前台的canvasid
                    type: 'line',//绘图方式选择折线图
                    categories: res.data.selObsSensorType.wxCharts5day.categories,
                    //返回的近五条数据情况,
                    series: [{
                        name: '近5天数据',
                        data: res.data.selObsSensorType.wxCharts5day.series[0].data,
                        format: function (val) {
                            return val.toFixed(1);
                        }
                    }],
                    yAxis: {
                        title: res.data.selObsSensorType.wxCharts5day.series[0].name,//y轴标题
                        format: function (val) {
                            return val.toFixed(1);//保留一位小数
                        },
                        max:res.data.selObsSensorType.wxCharts5.series[0].data[0]/20*21,//y轴最大值为数据最大值多1/20
                        min: res.data.selObsSensorType.wxCharts5.series[0].data[0]/20*19//y轴最小值为数据最大值少1/20
                    },
                    width: 320,//canvas画布的大小
                    height: 200
                });
            },
            fail: function () {
                // 请求失败回调函数
            },
            complete: function () {
                // 请求完成回调函数
               
            }
        })
        this.setData({//设置传感器信息，并进行前台显示
            obsSensor: obsSensor
        });
    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载

  app.globalData.obsid=options.obsid;
        var that = this;
        wx.request({//通过检测点ID向服务器请求传感器信息情况
            url: 'https://dzjc.cjlu.edu.cn/wx/obsSensor?obsid=' + options.obsid,
            data: {},
            method: 'GET', //设置请求的方法
            // header: {}, // 设置请求的 header
            success: function (res) {
                // 请求成功回调函数
                that.setData({
                    obsSensor: res.data
                })

            },
            fail: function () {
                // 请求失败回调函数
            },
            complete: function () {
                // 请求完成回调函数
            }
        })
    }
})







//    /wxcharts/wxcharts.js