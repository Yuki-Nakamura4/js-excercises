function testTryCatchFinally() {
    try {
        console.log("try");
        throw new Error("Error");
    } catch (error) {
        console.log("catch");
        console.error(error.message);
    } finally {
        console.log("finally");
    }
}

testTryCatchFinally();

// try
// catch
// Error
// finally