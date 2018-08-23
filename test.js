'use strict';

const Null = require('./');
const helper = require('broccoli-test-helper');
const expect = require('chai').expect;
const createBuilder = helper.createBuilder;
const createTempDir = helper.createTempDir;
const merge = require('broccoli-merge-trees');
const fs = require('fs');

describe('broccoli-null', function() {
  it('does nothing', async function() {
    const input = await createTempDir();

    const subject = new Null(input.path());
    const output = createBuilder(subject);
    input.write({
      'a.herp': 'A',
      lib: {
        'b.herp': 'B',
        'c.herp': 'C',
      },
    });

    await output.build();

    expect(output.read()).to.deep.equal({});
    expect(output.changes()).to.deep.equal({});

    await output.build();

    expect(output.read()).to.deep.equal({});
    expect(output.changes()).to.deep.equal({});
  });

  it(`doesn't require an input`, async function() {
    const input = await createTempDir();

    const subject = new Null();
    const output = createBuilder(subject);
    input.write({
      'a.herp': 'A',
      lib: {
        'b.herp': 'B',
        'c.herp': 'C',
      },
    });

    await output.build();

    expect(output.read()).to.deep.equal({});
    expect(output.changes()).to.deep.equal({});

    await output.build();

    expect(output.read()).to.deep.equal({});
    expect(output.changes()).to.deep.equal({});
  });


  describe('constant', function(){
    const originalBuild = Null.prototype.build;

    afterEach(function() {
      Null.NULL.BROCCOLI_NULL_VERSION = '_1_';
      Null.prototype.build = originalBuild;
    });

    it('provides a constant', function() {
      expect(Null.NULL).to.eql(Null.NULL);
    });

    it('is a constant', function() {
      expect(Null.NULL).to.eql(new Null);
    });

    it('is a constant', function() {
      delete require.cache[fs.realpathSync(require.resolve("./"))];
      delete require.cache[require.resolve("./")];

      const FreshNull = require('./');
      expect(Null.NULL).to.eql(new Null);
      expect(Null.NULL).to.eql(new FreshNull());
    });

    it('only builds once', async function() {
      let count = 0;
      Null.prototype.build = function() {
        count++;
      };

      const input = await createTempDir();

      const output = createBuilder(merge([new Null(), new Null(), Null.NULL, Null.NULL]));
      input.write({
        'a.herp': 'A',
        lib: {
          'b.herp': 'B',
          'c.herp': 'C',
        },
      });

      expect(count).to.eql(0);
      await output.build();
      expect(count).to.eql(1);

      expect(output.read()).to.deep.equal({});
      expect(output.changes()).to.deep.equal({});

      await output.build();
      expect(count).to.eql(2);

      expect(output.read()).to.deep.equal({});
      expect(output.changes()).to.deep.equal({});
    });
  });

  it('does not support call constructor', function() {
    expect(() => Null()).to.throw(/Failed to construct/);
  });
});
