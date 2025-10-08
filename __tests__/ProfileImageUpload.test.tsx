/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import ProfileImage from '../src/components/atoms/ProfileImage';

describe('ProfileImage Component', () => {
  test('renders with initials when no image provided', () => {
    const tree = ReactTestRenderer.create(
      <ProfileImage fullName="John Doe" size={80} />
    );
    expect(tree).toMatchSnapshot();
  });

  test('renders with image when imageUrl provided', () => {
    const tree = ReactTestRenderer.create(
      <ProfileImage 
        imageUrl="https://example.com/profile.jpg" 
        fullName="John Doe" 
        size={80} 
      />
    );
    expect(tree).toMatchSnapshot();
  });

  test('renders with edit icon when showEditIcon is true', () => {
    const tree = ReactTestRenderer.create(
      <ProfileImage 
        fullName="John Doe" 
        size={80} 
        showEditIcon={true}
        onPress={() => {}}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  test('generates correct initials for single name', () => {
    const tree = ReactTestRenderer.create(
      <ProfileImage fullName="John" size={80} />
    );
    expect(tree).toMatchSnapshot();
  });

  test('generates correct initials for multiple names', () => {
    const tree = ReactTestRenderer.create(
      <ProfileImage fullName="John Michael Doe" size={80} />
    );
    expect(tree).toMatchSnapshot();
  });

  test('handles empty name gracefully', () => {
    const tree = ReactTestRenderer.create(
      <ProfileImage fullName="" size={80} />
    );
    expect(tree).toMatchSnapshot();
  });
});
