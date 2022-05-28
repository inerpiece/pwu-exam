import { render } from '@testing-library/react';
import Banner from '../../ui/Banner';
import '@testing-library/jest-dom';

describe("Banner", () => {
  it('should render without crashing', () => {
    const div = document.createElement("div");
    render(
      <Banner />, div
    );
  });
})