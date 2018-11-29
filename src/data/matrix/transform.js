/**
 * Created by zhangyong on 2017/3/17.
 */

/**
 * Collection of affine 2d transformation functions. The functions work on an
 * array of 6 elements. The element order is compatible with the [SVGMatrix
 * interface](https://developer.mozilla.org/en-US/docs/Web/API/SVGMatrix) and is
 * a subset (elements a to f) of a 3x3 martrix:
 * ```
 * [ a c e ]
 * [ b d f ]
 * [ 0 0 1 ]
 * ```
 */

export const Transform = {
  
  /**
   * @private
   * @type {ol.Transform}
   */
  tmp_: new Array(6),
  
  /**
   * 恒等矩阵
   *
   * Create an identity（恒等） transform.
   * @return {!Transform} Identity transform.
   */
  create: function () {
    return [1, 0, 0, 1, 0, 0]
  },
  
  /**
   * Resets the given transform to an identity（恒等） transform.
   *
   * @param {!Transform} transform Transform.
   * @return {!Transform} Transform.
   */
  reset: function (transform) {
    return transform.set(transform, 1, 0, 0, 1, 0, 0)
  },
  
  /**
   *
   * @param flatCoordinates
   * @param offset
   * @param end
   * @param stride
   * @param transform
   * @param opt_dest
   * @returns {Array}
   */
  transform2D: function (flatCoordinates, offset, end, stride, transform, opt_dest) {
    const dest = opt_dest ? opt_dest : []
    let i = 0
    let j
    
    for (j = offset; j < end; j += stride) {
      const x = flatCoordinates[j]
      const y = flatCoordinates[j + 1]
      dest[i++] = transform[0] * x + transform[2] * y + transform[4]
      dest[i++] = transform[1] * x + transform[3] * y + transform[5]
    }
    
    if (opt_dest && dest.length != i) {
      dest.length = i
    }
    
    return dest
  },
  
  /**
   * 矩阵相乘
   *
   * Multiply（相乘） the underlying matrices of two transforms and return the result in
   * the first transform.
   *
   * @param {!Transform} transform1 Transform parameters of matrix 1.
   * @param {!Transform} transform2 Transform parameters of matrix 2.
   * @return {!Transform} transform1 multiplied with transform2.
   */
  multiply: function (transform1, transform2) {
    const a1 = transform1[0]
    const b1 = transform1[1]
    const c1 = transform1[2]
    const d1 = transform1[3]
    const e1 = transform1[4]
    const f1 = transform1[5]
    const a2 = transform2[0]
    const b2 = transform2[1]
    const c2 = transform2[2]
    const d2 = transform2[3]
    const e2 = transform2[4]
    const f2 = transform2[5]
    
    transform1[0] = a1 * a2 + c1 * b2
    transform1[1] = b1 * a2 + d1 * b2
    transform1[2] = a1 * c2 + c1 * d2
    transform1[3] = b1 * c2 + d1 * d2
    transform1[4] = a1 * e2 + c1 * f2 + e1
    transform1[5] = b1 * e2 + d1 * f2 + f1
    
    return transform1
  },
  
  /**
   * Set the transform components a-f on a given transform.
   *
   * @param {!Transform} transform Transform.
   * @param {number} a The a component of the transform.
   * @param {number} b The b component of the transform.
   * @param {number} c The c component of the transform.
   * @param {number} d The d component of the transform.
   * @param {number} e The e component of the transform.
   * @param {number} f The f component of the transform.
   * @return {!Transform} Matrix with transform applied.
   */
  set: function (transform, a, b, c, d, e, f) {
    transform[0] = a
    transform[1] = b
    transform[2] = c
    transform[3] = d
    transform[4] = e
    transform[5] = f
    return transform
  },
  
  /**
   * Set transform on one matrix from another matrix.
   *
   * @param {!Transform} transform1 Matrix to set transform to.
   * @param {!Transform} transform2 Matrix to set transform from.
   * @return {!Transform} transform1 with transform from transform2 applied.
   */
  setFromArray: function (transform1, transform2) {
    transform1[0] = transform2[0]
    transform1[1] = transform2[1]
    transform1[2] = transform2[2]
    transform1[3] = transform2[3]
    transform1[4] = transform2[4]
    transform1[5] = transform2[5]
    return transform1
  },
  
  /**
   * 矩阵运算
   * 将坐标值矩阵运算
   *
   * Transforms the given coordinate with the given transform returning the
   * resulting, transformed coordinate. The coordinate will be modified in-place.
   *
   * @param {Transform} transform The transformation.
   * @param {Coordinate|Pixel} coordinate The coordinate to transform.
   * @return {Coordinate|Pixel} return coordinate so that operations can be
   *     chained together.
   */
  apply: function (transform, coordinate) {
    const x = coordinate[0]
    const y = coordinate[1]
    coordinate[0] = transform[0] * x + transform[2] * y + transform[4]
    coordinate[1] = transform[1] * x + transform[3] * y + transform[5]
    return coordinate
  },
  
  /**
   * Applies rotation to the given transform.
   *
   * 矩阵旋转
   *
   * @param {!Transform} transform Transform.
   * @param {number} angle Angle in radians.
   * @return {!Transform} The rotated transform.
   */
  rotate: function (transform, angle) {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return transform.multiply(transform, transform.set(transform.tmp_, cos, sin, -sin, cos, 0, 0))
  },
  
  /**
   *  Applies scale to a given transform.
   *
   * 矩阵缩放
   *
   * @param {!Transform} transform Transform.
   * @param {number} x Scale factor x.
   * @param {number} y Scale factor y.
   * @return {!Transform} The scaled transform.
   */
  scale: function (transform, x, y) {
    return transform.multiply(transform,
      transform.set(transform.tmp_, x, 0, 0, y, 0, 0))
  },
  
  /**
   * Applies translation to the given transform.
   *
   * 矩阵转换
   *
   * @param {!Transform} transform Transform.
   * @param {number} dx Translation x.
   * @param {number} dy Translation y.
   * @return {!Transform} The translated transform.
   */
  translate: function (transform, dx, dy) {
    return transform.multiply(transform,
      transform.set(transform.tmp_, 1, 0, 0, 1, dx, dy))
  },
  
  /**
   * Creates a composite transform given an initial translation, scale, rotation, and
   * final translation (in that order only, not commutative).
   *
   * 复杂矩形运算
   *
   * @param {!Transform} transform The transform (will be modified in place).
   * @param {number} dx1 Initial translation x.
   * @param {number} dy1 Initial translation y.
   * @param {number} sx Scale factor x.
   * @param {number} sy Scale factor y.
   * @param {number} angle Rotation (in counter-clockwise radians).
   * @param {number} dx2 Final translation x.
   * @param {number} dy2 Final translation y.
   * @return {!Transform} The composite transform.
   */
  compose: function (transform, dx1, dy1, sx, sy, angle, dx2, dy2) {
    const sin = Math.sin(angle)
    const cos = Math.cos(angle)
    transform[0] = sx * cos
    transform[1] = sy * sin
    transform[2] = -sx * sin
    transform[3] = sy * cos
    transform[4] = dx2 * sx * cos - dy2 * sx * sin + dx1
    transform[5] = dx2 * sy * sin + dy2 * sy * cos + dy1
    return transform
  },
  
  /**
   * Invert the given transform.
   *
   * @param {!Transform} transform Transform.
   * @return {!Transform} Inverse of the transform.
   */
  invert: function (transform) {
    const det = Transform.determinant(transform)
    
    const a = transform[0]
    const b = transform[1]
    const c = transform[2]
    const d = transform[3]
    const e = transform[4]
    const f = transform[5]
    
    transform[0] = d / det
    transform[1] = -b / det
    transform[2] = -c / det
    transform[3] = a / det
    transform[4] = (c * f - d * e) / det
    transform[5] = -(a * f - b * e) / det
    
    return transform
  },
  
  /**
   * Returns the determinant of the given matrix.
   *
   * 行列式
   *
   * @param {!Transform} mat Matrix.
   * @return {number} Determinant.
   */
  determinant: function (mat) {
    return mat[0] * mat[3] - mat[1] * mat[2]
  }
}

export default {
  Transform
}