""" Run this script directly after cloning the project. """

import os
import os.path as op
import platform
import sys
import subprocess
import shlex


SLUG = 'pyactr_demo'
WINDOWS = (platform.system() == 'Windows')
VIRTUALENV_BINDIR = 'Scripts' if WINDOWS else 'bin'
LOGFILE_NAME = 'bootstrap.log'


class Command(object):
    """ Representation of a command to be run in project setup.

        We create a bunch of these to implement most of the steps in main.
    """

    @classmethod
    def get_log(cls):
        if not hasattr(cls, 'log'):
            cls.log = open(LOGFILE_NAME, 'w', buffering=1)
        return cls.log

    def __init__(self, description, command, *args, **kwargs):
        self.description = description
        if isinstance(command, str):
            command = shlex.split(command)
        self.command = command
        self.args = args
        if 'stdout' not in kwargs:
            kwargs['stdout'] = self.get_log()
        if 'stderr' not in kwargs:
            kwargs['stderr'] = subprocess.STDOUT
        self.kwargs = kwargs

    def __call__(self):
        log = self.get_log()
        print('{}... '.format(self.description), end='', flush=True)
        log.write('$ {}\n\n'.format(self))
        try:
            # On Windows, we need to run the command through the shell to get
            # access to commands in PATH.
            exit_code = subprocess.call(
                self.command, *self.args, **self.kwargs, shell=WINDOWS
            )
            if exit_code != 0:
                print('failed ({}).'.format(exit_code))
                return False
            print('success.')
            log.write('\n\n')
            return True
        except Exception as e:
            print(e)
            log.write('never ran (exception)\n\n')
            return False

    def __str__(self):
        representation = ' '.join(map(shlex.quote, self.command))
        if 'cwd' in self.kwargs:
            return '(cd {} ; {})'.format(self.kwargs['cwd'], representation)
        return representation


def main(argv):
    already_in_project, cd_into_project = prepare_cwd()
    frontpack = install_frontend_packages()
    main_branch = track_main()
    gitflow = False
    if main_branch:
        gitflow = setup_gitflow()
    if not all([gitflow, frontpack]):
        print('\nPlease read {} for information on failed commands.'.format(LOGFILE_NAME))
    print('\nAlmost ready to go! Just a couple more commands to run:')
    if not already_in_project: print(cd_into_project)
    if not frontpack: print(install_all_packages)
    if not main_branch: print(track_main)
    if not gitflow: print(setup_gitflow)
    print(yarn_start)


def prompt(variable, default_value):
    return input('{} [{}]: '.format(variable, default_value)) or default_value


def prepare_cwd():
    invocation_dir = op.abspath(os.getcwd())
    project_root = op.dirname(op.abspath(__file__))
    if invocation_dir == project_root:
        return True, None
    os.chdir(project_root)
    relative_path = op.relpath(project_root, invocation_dir)
    cd_into_project = Command('', ['cd', relative_path])
    return False, cd_into_project

install_frontend_packages = Command(
    'Install the frontend packages',
    ['yarn', 'fyarn'],
)

install_all_packages = Command('Install all packages', ['yarn'])

track_main = Command(
    'Create origin-tracking main branch',
    ['git', 'branch', '--track', 'main', 'origin/main'],
)

setup_gitflow = Command(
    'Initialize git-flow',
    ['git', 'flow', 'init', '-d'],
)

yarn_start = Command('', ['yarn', 'start'])


if __name__ == '__main__':
    sys.exit(main(sys.argv))
