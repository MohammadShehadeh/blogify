// @testing-library/jest-dom includes a set of convenient custom matchers
// such as .toBeInTheDocument() making it easier to write tests.
import '@testing-library/jest-dom';
import { TextEncoder } from 'node:util';

global.TextEncoder = TextEncoder;
