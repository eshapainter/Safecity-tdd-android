<!-- header placeholder -->
<?php $this->load->view('admin/includes/header'); ?>
    
    <div class="admin-table-header bg-white">
        <?php $this->load->view('admin/includes/topbar'); ?>
    </div>
    <iframe id="create-incident-iframe" width="100%" height="100%" src="<?php echo base_url() ?>shareIncident-form" frameborder="0"></iframe>

<!-- Footer -->
<?php $this->load->view('admin/includes/footer'); ?>
</body>
</html>