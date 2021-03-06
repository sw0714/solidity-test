// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("Lifecycle contract", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let Lifecycle;
  let LifecycleContract;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    // Deploy Contract
    Lifecycle = await ethers.getContractFactory("Lifecycle");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    LifecycleContract = await Lifecycle.deploy();
  });

  describe("Transactions", function () {
    // If the callback function is async, Mocha will `await` it.
    it("Should return the user its Lifecycle stage", async function () {
      expect(await LifecycleContract.getStage(10)).to.equal(0);
      expect(await LifecycleContract.getStage(13)).to.equal(1);
      expect(await LifecycleContract.getStage(25)).to.equal(2);
      expect(await LifecycleContract.getStage(160)).to.equal(3);
    });
  });
});