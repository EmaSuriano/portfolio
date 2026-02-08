# E2E Tests

This directory contains end-to-end tests for the portfolio website using Playwright.

## Running Tests

```bash
# Run all tests in headless mode
yarn test

# Run tests with UI mode (recommended for development)
yarn test:ui

# Run tests in headed mode (see the browser)
yarn test:headed

# Run tests in debug mode
yarn test:debug

# View the last test report
yarn test:report
```

## Test Structure

```
tests/e2e/
├── homepage.spec.ts      # Homepage functionality tests
├── blog.spec.ts          # Blog listing and post pages
├── til.spec.ts           # TIL (Today I Learned) pages
├── about.spec.ts         # About page tests
├── search.spec.ts        # Search functionality tests
├── navigation.spec.ts    # Navigation and routing tests
└── accessibility.spec.ts # Accessibility tests
```

## Test Coverage

### Homepage (`homepage.spec.ts`)
- ✅ Author name and role display
- ✅ Company information
- ✅ Navigation links
- ✅ Social links in footer
- ✅ Search button functionality
- ✅ Responsive design

### Blog (`blog.spec.ts`)
- ✅ Blog listing page loads
- ✅ Blog posts display with dates
- ✅ Navigation to blog posts
- ✅ Blog post structure (title, author, content)
- ✅ Cover images display
- ✅ Navigation back to blog list

### TIL (`til.spec.ts`)
- ✅ TIL listing page loads
- ✅ TIL entries display
- ✅ Navigation to TIL entries
- ✅ Date information

### About (`about.spec.ts`)
- ✅ About page loads
- ✅ Projects section displays
- ✅ Talks section displays
- ✅ Project links work
- ✅ Accessible via navigation

### Search (`search.spec.ts`)
- ✅ Search modal opens
- ✅ Modal closes with Escape key
- ✅ Search input field is present
- ✅ Can type in search
- ✅ Keyboard shortcuts work (Cmd/Ctrl+K)

### Navigation (`navigation.spec.ts`)
- ✅ Navigate between all main pages
- ✅ Current page highlighting
- ✅ Browser back button works
- ✅ 404 page handling
- ✅ Footer links work
- ✅ Skip to content link

### Accessibility (`accessibility.spec.ts`)
- ✅ Proper heading hierarchy
- ✅ Images have alt text
- ✅ Links have accessible names
- ✅ Keyboard navigation
- ✅ Search is keyboard accessible
- ✅ Page has lang attribute
- ✅ Proper color contrast

## Writing New Tests

When adding new features, create corresponding test files or add test cases to existing files:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/your-page');

    // Your test assertions
    await expect(page.locator('selector')).toBeVisible();
  });
});
```

## CI/CD Integration

Tests run automatically on every pull request via GitHub Actions. The workflow:

1. Checks out code with submodules
2. Sets up Node.js
3. Installs dependencies
4. Installs Playwright browsers
5. Runs type checking
6. Builds the project
7. **Runs E2E tests**
8. Uploads test reports as artifacts

## Configuration

Test configuration is in `playwright.config.ts`:

- Tests run in Chromium by default
- Base URL: `http://localhost:4321`
- Dev server starts automatically
- Screenshots on failure
- Trace on first retry
- Retries: 2 in CI, 0 locally

## Best Practices

1. **Use semantic selectors**: Prefer role-based selectors over CSS classes
2. **Wait for visibility**: Use `toBeVisible()` to ensure elements are ready
3. **Handle async operations**: Use `waitForLoadState()` when needed
4. **Test user flows**: Test complete scenarios, not just individual elements
5. **Keep tests isolated**: Each test should be independent
6. **Use descriptive names**: Test names should clearly describe what they test

## Debugging Tests

```bash
# Run specific test file
yarn test tests/e2e/homepage.spec.ts

# Run tests with specific tag
yarn test --grep @smoke

# Generate trace for debugging
yarn test --trace on

# Use headed mode to see what's happening
yarn test:headed
```

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
