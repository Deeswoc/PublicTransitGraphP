
let driver = {session: ()=>{
    return {
        writeTransaction: async (runTransaction)=>{
            return runTransaction();
        },
        readTransaction: async (runTransaction)=>{
            return runTransaction();
        },
        close: ()=>{

        }
    }}
}

exports.driver = driver;