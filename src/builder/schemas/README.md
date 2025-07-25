# Component Schemas and Validation

This directory contains Zod schemas and validation functions for component props in the Klickbee CMS. These schemas are used to validate component props in forms, API endpoints, and other places where component data is entered or modified.

## Overview

The component schema system consists of:

1. **Base Schemas**: Schemas for component content props and style props
2. **Component-Specific Schemas**: Schemas for each component type based on the component map
3. **Validation Functions**: Functions for validating component props

## Installation

Zod is already installed as a dependency in the project. No additional installation is required.

## Usage

### Importing

All schemas and validation functions are exported from a single entry point:

```typescript
import {
	// Schemas
	componentContentPropsSchema,
	componentStylePropsSchema,
	componentMapEntrySchema,

	// Component-specific schemas
	headingSchema,
	buttonSchema,
	// ... other component schemas

	// Validation functions
	validateComponentContentProps,
	validateComponentStyleProps,
	validateComponentProps,

	// Types
	ComponentName,
	ComponentContentProps,
	ComponentStyleProps,
	// ... other types
} from "@/builder/schemas";
```

### Validating Component Props

#### Basic Validation

To validate props for a specific component:

```typescript
import { validateComponentProps, ComponentName } from "@/builder/schemas";

const componentName: ComponentName = "Heading";
const props = {
	contentProps: {
		text: "Hello World",
		level: 1,
	},
	styleProps: {
		typography: {
			textAlign: "center",
			color: {
				hexCode: "#333333",
				name: "Dark Gray",
				type: "primary",
			},
		},
	},
};

const result = validateComponentProps(componentName, props);

if (result.success) {
	// Validation succeeded, use the validated data
	const validatedProps = result.data;
	// Do something with validatedProps
} else {
	// Validation failed, handle the errors
	const errors = result.error;
	// Handle errors
}
```

#### Validating Only Content Props

```typescript
import {
	validateComponentContentProps,
	ComponentName,
} from "@/builder/schemas";

const componentName: ComponentName = "Button";
const contentProps = {
	text: "Click Me",
	href: "https://example.com",
	icon: "arrow-right",
};

const result = validateComponentContentProps(componentName, contentProps);

if (result.success) {
	// Validation succeeded
	const validatedContentProps = result.data;
	// Do something with validatedContentProps
} else {
	// Validation failed
	const errors = result.error;
	// Handle errors
}
```

#### Validating Only Style Props

```typescript
import { validateComponentStyleProps, ComponentName } from "@/builder/schemas";

const componentName: ComponentName = "Section";
const styleProps = {
	layout: {
		display: "flex",
		flex: {
			direction: "column",
			justifyContent: "center",
			alignItems: "center",
		},
	},
	background: {
		color: {
			hexCode: "#f5f5f5",
			name: "Light Gray",
			type: "primary",
		},
	},
};

const result = validateComponentStyleProps(componentName, styleProps);

if (result.success) {
	// Validation succeeded
	const validatedStyleProps = result.data;
	// Do something with validatedStyleProps
} else {
	// Validation failed
	const errors = result.error;
	// Handle errors
}
```

### Getting Formatted Error Messages

```typescript
import {
	validateComponentProps,
	getValidationErrorMessages,
	isValidationSuccess,
	ComponentName,
} from "@/builder/schemas";

const componentName: ComponentName = "Heading";
const props = {
	contentProps: {
		text: "Hello World",
		level: 7, // Invalid level (should be 1-6)
	},
};

const result = validateComponentProps(componentName, props);

if (!isValidationSuccess(result)) {
	// Get formatted error messages
	const errorMessages = getValidationErrorMessages(result.error.contentProps);
	console.error("Validation errors:", errorMessages);
	// ["level: Invalid input"]
}
```

### Using Component-Specific Schemas Directly

If you need more control over validation, you can use the component-specific schemas directly:

```typescript
import { headingSchema, ComponentName } from "@/builder/schemas";

const contentProps = {
	text: "Hello World",
	level: 1,
};

// Validate content props
const contentResult = headingSchema.contentProps.safeParse(contentProps);

if (contentResult.success) {
	// Validation succeeded
	const validatedContentProps = contentResult.data;
	// Do something with validatedContentProps
} else {
	// Validation failed
	const errors = contentResult.error;
	// Handle errors
}
```

## Schema Structure

### Base Schemas

- `componentContentPropsSchema`: Schema for component content props
- `componentStylePropsSchema`: Schema for component style props
- `componentMapEntrySchema`: Schema for component map entries

### Component-Specific Schemas

Each component has its own schema that is derived from the component map:

- `sectionSchema`, `containerSchema`, `gridSchema`, etc. for layout components
- `headingSchema`, `paragraphSchema`, `richTextSchema`, etc. for typography components
- `buttonSchema` for interactive components
- `imageSchema`, `videoSchema`, `embedSchema` for media components
- `formBlockSchema` for form components
- `textFieldSchema`, `textAreaSchema`, `checkboxSchema`, etc. for form element components

### Validation Functions

- `validateComponentContentProps`: Validates content props for a specific component
- `validateComponentStyleProps`: Validates style props for a specific component
- `validateComponentProps`: Validates both content and style props for a specific component
- `isValidationSuccess`: Type guard to check if a validation result is successful
- `getValidationErrorMessages`: Gets formatted error messages from a validation error

## Contributing

When adding new components or modifying existing ones:

1. Update the component map in `src/builder/types/components/componentMap.ts`
2. The component schemas will be automatically generated based on the component map

If you need to add new validation rules:

1. Update the appropriate schema in `src/builder/types/components/properties/componentContentPropsSchema.ts` or `src/builder/types/components/properties/componentStylePropsSchema.ts`
2. Add tests for the new validation rules in `src/builder/utils/componentValidation.test.ts`
