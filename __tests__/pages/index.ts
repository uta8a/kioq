import { render } from 'react-dom';
import { Sample } from '../../components/Sample';

describe('Sample test #1', () => {
  let container: HTMLDivElement;
  beforeEach(() => {
    document.body.appendChild((container = document.createElement('div')));
  });
  afterEach(() => {
    document.body.removeChild(container);
  });
  it('should hello, kioq', () => {
    render(Sample(), container);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
