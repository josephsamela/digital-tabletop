import os
from glob import glob
import pytest

# Generate documentation
os.system('cp readme.md > docs/index.md')
## Modules
for f in glob("module/*.py"):
    f = f.split('/')[1].split('.')[0]
    os.system('pydocmd simple module.'+f+'++ > docs/classes/'+f+'.md')
## Tests
for f in glob("tests/*.py"):
    f = f.split('/')[1].split('.')[0]
    os.system('pydocmd simple tests.'+f+'++ > docs/tests/'+f+'.md')

# Run tests
tests = ['test_module_user', 'test_module_auth', 'test_module_game']

for t in tests:
    pytest.main([
        '--disable-warnings', 
        '--html=docs/tests/report_'+t+'.html', 
        '--self-contained', 
        'tests/'+t+'.py'
        ])

# Start app
os.system('python app.py')
