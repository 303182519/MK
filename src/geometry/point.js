/**
 * Created by zypc on 2016/11/13.
 */

import Geometry from './geometry'
import Extent from './extent'
import {ExtentUtil} from './support/extentutil'
import {squaredDistance} from './support/geometryutil'


/**
 * 定义点类和数据结构
 *
 * @class Point
 * @extends Geometry
 * @module geometry
 * @constructor
 * @example
 *
 *    var point = new mk.Point(100, 100)
 */
export default class Point extends Geometry {

  /**
   * 根据x和y构建一个点对象
   * @param x 默认值为0
   * @param y 默认值为0
   * @constructor
   */
  constructor (xValue, yValue) {
    super()

    this.x = xValue
    this.y = yValue
  }

  /**
   * 获取对象的几何类型
   *
   * @protected
   */
  get geometryType () { return Geometry.POINT }

  /**
   * 获取点的最小外接矩形
   *
   * @note 点是没有最小外接矩形
   * @returns {null}
   */
  get extent () {
    if (!this._extent) {
      const extentObj = ExtentUtil.createScaleExtent(this, 8)
      this._extent = new Extent(extentObj[0], extentObj[1], extentObj[2], extentObj[3])
    }
    
    return this._extent
  }

  /**
   * 获取 X 坐标值
   *
   * @property x
   * @type x {number}
   */
  get x () { return this._x }
  set x (value) { 
    this._x = value
    this._extent = null
  }
  
  /**
   * 获取 Y 坐标值
   *
   * @property y
   * @type {number}
   */
  get y () { return this._y }
  set y (value) { 
    this._y = value
    this._extent = null
  }

  /**
   * 根据x,y的偏移量得到点
   *
   * @method offset
   * @param nx x轴偏移量
   * @param ny y轴偏移量
   * @returns {mk.Point} 返回偏移以后的点对象
   */
  offset (nx, ny) {
    return new Point(this.x + nx, this.y + ny)
  }
  
  /**
   * containsXY
   * @param x
   * @param y
   * @param opt
   * @returns {boolean}
   */
  containsXY (x, y, opt = {}) {
    const tolerance = opt.tolerance ? opt.tolerance : 2
    const pointA = this

    const distance = squaredDistance(pointA.x, pointA.y, x, y)
    if (Math.sqrt(distance/2) <= tolerance) {
      return true
    }

    return false
  }

  /**
   * 更新x,y坐标值
   *
   * @method update
   * @param nx x新值
   * @param ny y新值
   */
  update (nx, ny) {
    this.x = nx
    this.y = ny
    
    this._extent = null
  }
  
  /**
   *
   *
   * getFlatInteriorPoint
   * @returns {[]}
   */
  getFlatInteriorPoint () {
    return this.getCoordinates()
  }
  
  /**
   * 获取点的坐标
   *
   * @method getCoordinates
   * @returns {Array}
   */
  getCoordinates () {
    return [this.x, this.y]
  }

  /**
   * 点的位置就是坐标点的位置减去偏移量的位置
   *
   * @method getFormShowPosition
   * @param {Number} offsetX x的偏移量
   * @param {Number} offsetY y的偏移量
   * @return {[]}
   */
  getFormShowPosition (offsetX = 0, offsetY = 10) {
    return [this.x - offsetX, this.y - offsetY]
  }

  /**
   * 设置点的坐标
   *
   * @method setCoordinates
   * @param coordinates
   */
  setCoordinates (coordinates) {
    this.update(coordinates[0], coordinates[1])
    this.changed()
  }
  
  /**
   * getCoordinateIndex
   * @returns {number}
   */
  getCoordinateIndex () {
    return 0
  }
  
  /**
   * 判断两个图形对象是否相等
   *
   * 判断标准：该图形的所有顶点值是否一致
   *
   * @method equal
   * @param geometry
   * @return {Boolean}
   */
  equal (geom) {
    let equals = false
    if (geom !== null) {
      equals = ((this.x === geom.x && this.y === geom.x) ||
      (Number.isNaN(this.x) && Number.isNaN(this.y) && Number.isNaN(geom.x) && Number.isNaN(geom.y)))
    }
    return equals
  }
  
  /**
   * 克隆点
   *
   * @method clone
   * @returns {Point}
   */
  clone () {
    return new Point(this.x, this.y)
  }
}
