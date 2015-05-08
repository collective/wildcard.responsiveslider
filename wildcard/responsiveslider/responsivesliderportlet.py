from zope.interface import implements

from plone.portlets.interfaces import IPortletDataProvider
from plone.app.portlets.portlets import base
from Products.CMFCore.utils import getToolByName

from zope.formlib import form

from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile


class Iresponsivesliderportlet(IPortletDataProvider):
    """A portlet

    It inherits from IPortletDataProvider because for this portlet, the
    data that is being rendered and the portlet assignment itself are the
    same.
    """


class Assignment(base.Assignment):
    """Portlet assignment.

    This is what is actually managed through the portlets UI and associated
    with columns.
    """

    implements(Iresponsivesliderportlet)

    def __init__(self):
        pass

    @property
    def title(self):
        """This property is used to give the title of the portlet in the
        "manage portlets" screen.
        """
        return "Responsive Slider Portlet"


class Renderer(base.Renderer):
    render = ViewPageTemplateFile('responsivesliderportlet.pt')

    def get_images(self):
        catalog = getToolByName(self.context, 'portal_catalog')
        return [b.getObject() for b in catalog(portal_type='slider_image',
                                               review_state='published',
                                               sort_on='getObjPositionInParent')]


class AddForm(base.NullAddForm):
    """Portlet add form.
    """
    def create(self):
        return Assignment()


class EditForm(base.EditForm):
    """Portlet edit form.

    This is registered with configure.zcml. The form_fields variable tells
    zope.formlib which fields to display.
    """
    form_fields = form.Fields(Iresponsivesliderportlet)
