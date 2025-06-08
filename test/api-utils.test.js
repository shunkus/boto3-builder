import { strict as assert } from 'assert';
import { getTurndownService, convertHighlightText } from '../pages/api/[service]/command/[command].js';
import { runCommand } from '../pages/api/cli/execute.js';
import test from 'node:test';

// Test convertHighlightText removes square brackets
test('convertHighlightText removes brackets', () => {
  const input = '[some] text';
  const output = convertHighlightText(input);
  assert.equal(output, 'some text');
});

// Test getTurndownService returns instance with expected options
test('getTurndownService returns configured instance', () => {
  const service = getTurndownService();
  assert.equal(service.options.headingStyle, 'atx');
  assert.equal(service.options.hr, '---');
});

// Test runCommand executes shell command
test('runCommand executes command', async () => {
  const result = await runCommand('echo hello');
  assert.equal(result.trim(), 'hello');
});
