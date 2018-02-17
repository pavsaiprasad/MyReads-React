import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

const localStorageMock = {
    token:1234
};
global.localStorage = localStorageMock