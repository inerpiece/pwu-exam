import { render, screen } from '@testing-library/react';
import Banner from '../../Banner';
import '@testing-library/jest-dom';

describe("Banner", () => {
  it('should render without crashing', () => {
    const div = document.createElement("div");
    render(
        <Banner />, div
    );
  });
})