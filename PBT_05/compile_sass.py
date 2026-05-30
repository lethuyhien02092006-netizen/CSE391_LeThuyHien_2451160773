import os
import sass

def compile_scss():
    # Define paths relative to the script location
    script_dir = os.path.dirname(os.path.abspath(__file__))
    scss_file = os.path.join(script_dir, 'scss', 'style.scss')
    css_file = os.path.join(script_dir, 'style.css')
    
    print(f"Compiling {scss_file}...")
    try:
        # Compile SASS to CSS
        css_content = sass.compile(
            filename=scss_file,
            output_style='expanded' # Or 'compressed' for minified output
        )
        
        # Write compilation result to style.css
        with open(css_file, 'w', encoding='utf-8') as f:
            f.write(css_content)
        
        print(f"Successfully compiled SASS! Output saved to: {css_file}")
    except Exception as e:
        print(f"Error compiling SASS: {e}")

if __name__ == '__main__':
    compile_scss()
