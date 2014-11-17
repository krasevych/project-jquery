/* global describe, it */

(function () {
   'use strict';

   describe('Give it some context', function () {
      describe('maybe a bit more context here: ', function () {
         it('should ', function () {
            expect(4).toBe(3)
         });
         it('should run here few assertions', function () {
            expect(4).toBe(4)
         });
      });
   });
})();
