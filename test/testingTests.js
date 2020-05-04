var expect = require('chai').expect;


function printCake(){
    return 'Cake';
}


describe('printCake()', function(){
    it('Should return cake', function(){
        const expected = 'Cake';
        let actual = printCake();
        expect(actual).to.be.equal(expected);
    })
})