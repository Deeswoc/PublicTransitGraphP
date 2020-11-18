const routeModel = require('../models/route/route');
let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
chai.use(require('chai-as-promised'));

describe('validateTowns', ()=>{
    const mockIDs = [1, 2, 3, 4, 5, 6];
    let errorMessage = "Some IDs provided on path were not found in the database";
    let getTown = async (ID)=>{
        if(mockIDs.includes(ID))
            return {ID};
        return null;
    }
    let validateTowns = routeModel.validateTowns(getTown, routeModel.NotFound, errorMessage);
    describe('when town(s) is/are missing', ()=>{
        let badFunction = ()=>{
            throw new TypeError("Got milk");
        }

        it('should throw error', async ()=>{
            await validateTowns([9]).should.be.rejectedWith(routeModel.NotFound);
            await validateTowns([90, 4, 1]).should.be.rejectedWith(routeModel.NotFound);
            await validateTowns([7]).should.be.rejectedWith(routeModel.NotFound);
        });

        it('should return the non-existent ids', async ()=>{
            await validateTowns([9]).should.eventually.be
                .rejected
                .and.be.an.instanceOf(routeModel.NotFound)
                .and.have.deep.property('missing', [9])

            await validateTowns([1, 8, 0, 2]).should.eventually.be
                .rejected
                .and.be.an.instanceOf(routeModel.NotFound)
                .and.have.deep.property('missing')
                    .that.has.members([8, 0]);

            await validateTowns([1, 6, 3, 90]).should.eventually.be
                .rejected
                .and.be.an.instanceOf(routeModel.NotFound)
                .and.have.deep.property('missing')
                    .that.has.members([90]);        
        })
    });

    describe('when all towns exist', ()=>{
        it('should return true', async ()=>{
            await validateTowns([1, 2, 3, 4, 5, 6]).should.eventually.be.true;
            await validateTowns([1]).should.eventually.be.true;
            await validateTowns([3, 4, 6]).should.eventually.be.true;
            await validateTowns([3, 1, 6]).should.eventually.be.true;
        })
    })
})